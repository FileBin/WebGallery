using Filebin.Common.Validation;
using FluentValidation;

namespace Filebin.WebGalleryAPI;

public class ImageValidator : AbstractValidator<IFormFile> {
    public ImageValidator() {
        RuleFor(x => x.ContentType).ImageContentValidation();
    }
}
