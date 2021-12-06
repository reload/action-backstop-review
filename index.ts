import * as core from "@actions/core";
import * as github from "@actions/github";

try {
  const payload = github.context.payload;
  const comment = payload.comment;

  if (comment && comment.body && comment.body === "@visual ok") {
    core.setOutput("visual", "ok");
    console.info("set visual test to ok");
  }
} catch (error) {
  let message: string = "Something went wrong";
  if (error instanceof Error) {
    message = error.message;
  }
  core.setFailed(message);
}
