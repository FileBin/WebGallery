using Filebin.Common.Validation;
using FluentValidation;

namespace Filebin.WebGalleryAPI;

public class GuidValidator : AbstractValidator<string> {
    public GuidValidator() {
        RuleFor(x => x).GuidValidation();
    }
}
