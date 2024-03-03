namespace Filebin.Domain.Azure.Blob.Abstraction;

public interface IBlob : IBlobDescriptor {
    IDictionary<string, string> Metadata { get; }
    IMediaStream MediaStream { get; }
}