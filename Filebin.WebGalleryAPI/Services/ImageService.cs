using Filebin.Common.Azure.Blob;
using Filebin.Common.Util.Exceptions;
using Filebin.Common.Validation;
using Filebin.Domain.Auth.Abstraction;
using Filebin.Domain.Azure.Blob.Abstraction;
using Filebin.Domain.Azure.Blob.Abstraction.Services;
using Filebin.Domain.WebGallery;
using Filebin.Domain.WebGallery.Services;

namespace Filebin.WebGalleryAPI.Services;

public class ImageService(IBlobStorage fileStorage) : IAuthorizedImageService {
    public static readonly string containerName = "images";
    public async Task<IBlobDescriptor> AddImageAsync(IUserDescriptor user, IFormFile file) {
        ValidationUtils.Validate<ImageValidator, IFormFile>(file);

        var media = new MediaStream {
            ContentType = file.ContentType,
            Stream = file.OpenReadStream(),
        };

        var metadata = new {
            userId = user.UserId,
            availability = AvailabilityStatus.Draft,
        };

        return await fileStorage.UploadViaStreamAsync(containerName, media, metadata);
    }

    public async Task<IMediaStream> GetImageAsync(IUserDescriptor user, IBlobDescriptor blobDesc) {
        ValidationUtils.Validate<GuidValidator, string>(blobDesc.Id);
        var blob = await fileStorage.GetBlobAsync(containerName, blobDesc);

        AccessBlob(user, blob);

        return blob.MediaStream;
    }

    public async Task RemoveImageAsync(IUserDescriptor user, IBlobDescriptor blobDesc) {
        ValidationUtils.Validate<GuidValidator, string>(blobDesc.Id);

        var blob = await fileStorage.GetBlobAsync(containerName, blobDesc);

        AccessBlob(user, blob);

        await fileStorage.DeleteAsync(containerName, blobDesc);
    }

    public void AccessBlob(IUserDescriptor userDescriptor, IBlob blob) {
        var success = TryAccessBlob(userDescriptor, blob, out var message);
        if (success)
            return;

        throw new ForbiddenException(message);
    }

    public bool TryAccessBlob(IUserDescriptor userDescriptor, IBlob blob, out string message) {
        message = "";
        if (userDescriptor.IsAdmin)
            return true;

        message = "Blob doesn't have userId entry";
        if (!blob.Metadata.TryGetValue("userId", out string? blobUserId))
            return false;

        message = "Blob doesn't have availability entry";
        if (!blob.Metadata.TryGetValue("availability", out string? blobAvailability))
            return false;

        if (blobAvailability == AvailabilityStatus.Published.ToString())
            return true;

        message = "Resource is blocked!";
        if (blobAvailability == AvailabilityStatus.Blocked.ToString())
            return false;

        if (blobAvailability == AvailabilityStatus.Draft.ToString())
            if (blobUserId == userDescriptor.UserId)
                return true;

        message = "Access denied!";
        return false;
    }
}
