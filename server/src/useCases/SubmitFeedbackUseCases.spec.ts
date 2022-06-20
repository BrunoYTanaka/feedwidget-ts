import { SubmitFeedbackUseCases } from "./SubmitFeedbackUseCases";

const createFeedbackSpy = jest.fn();
const sentFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCases(
  { create: createFeedbackSpy },
  { sendMail: sentFeedbackSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png;base64,fsdfsdfsdfsdfsd",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sentFeedbackSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png;base64,fsdfsdfsdfsdfsd",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sentFeedbackSpy).not.toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,fsdfsdfsdfsdfsd",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sentFeedbackSpy).not.toHaveBeenCalled();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "invalid.image.png",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sentFeedbackSpy).not.toHaveBeenCalled();
  });
});
