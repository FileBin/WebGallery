using Filebin.Domain.Auth.Abstraction;
using Filebin.Domain.Azure.Blob.Abstraction;
using Microsoft.AspNetCore.Http;

namespace Filebin.Domain.WebGallery.Services;

public interface IAuthorizedImageService {
    public Task<IBlobDescriptor> AddImageAsync(IUserDescriptor user, IFormFile file);
    public Task<IMediaStream> GetImageAsync(IUserDescriptor user, IBlobDescriptor fileDesc);
    public Task RemoveImageAsync(IUserDescriptor user, IBlobDescriptor fileDesc);
}