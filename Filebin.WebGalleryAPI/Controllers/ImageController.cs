using Filebin.Common.Azure.Blob;
using Filebin.Common.Models.Auth;
using Filebin.Domain.WebGallery.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Filebin.WebGalleryAPI;

[ApiController]
[Route("api/images", Name = nameof(ImageController))]
[Authorize]
public class ImageController(IAuthorizedImageService imageService) : ControllerBase {

    [HttpPost]
    public async Task<IActionResult> PostImage(IFormFile file) {
        var userDesc = ClaimUserDescriptor.From(User);
        var desc = await imageService.AddImageAsync(userDesc, file);
        return Created(Url.Link(nameof(GetImage), new { id = desc.Id }), desc);
    }

    [HttpGet]
    [Route("{id}", Name = nameof(GetImage))]
    public async Task<HttpResponseMessage> GetImage(string id, string? name) {
        var userDesc = ClaimUserDescriptor.From(User);
        var blobDesc = new BlobDescriptor { Id = id };

        var media = await imageService.GetImageAsync(userDesc, blobDesc);

        return media.ToHttpResponseMessage(name);
    }

    [HttpDelete]
    [Route("{id}", Name = nameof(DeleteImage))]
    public async Task<IActionResult> DeleteImage(string id) {
        var userDesc = ClaimUserDescriptor.From(User);
        var blobDesc = new BlobDescriptor { Id = id };
        await imageService.RemoveImageAsync(userDesc, blobDesc);
        return Ok();
    }
}
