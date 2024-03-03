namespace Filebin.Domain.Azure.Blob.Abstraction;

public interface IMediaStream {
    string ContentType { get; }
    Stream Stream { get; }
}
