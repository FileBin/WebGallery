using Filebin.Domain.Azure.Blob.Abstraction;
using Microsoft.AspNetCore.Http;

namespace Filebin.Domain.WebGallery;

public interface IImageService {
    public Task<IBlobDescriptor> AddImageAsync(IFormFile file);
    public Task<IMediaStream> GetImageAsync(IBlobDescriptor fileDesc);
    public Task RemoveImageAsync(IBlobDescriptor fileDesc);
    public Task<IEnumerable<IBlobDescriptor>> ListImagesAsync();
}
