namespace Filebin.Domain.Azure.Blob.Abstraction.Services;
public interface IBlobStorage {
    public Task<IBlobDescriptor> UploadViaStreamAsync(string containerName, IMediaStream stream, object? metadata);
    public Task<IBlob> GetBlobAsync(string containerName, IBlobDescriptor blobDesc);
    public Task DeleteAsync(string containerName, IBlobDescriptor blobDesc);

    public Task<IEnumerable<IBlobDescriptor>> ListFilesAsync(string containerName);

}