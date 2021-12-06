import * as core from "@actions/core";
import * as github from "@actions/github";

try {
  const nameToGreet: string = core.getInput("who-to-greet");
  console.info(`Hello ${nameToGreet}! And everyone else`);

  const time: string = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload: string = JSON.stringify(github.context.payload, undefined, 2);
  console.info(`The event payload: ${payload}`);
} catch (error) {
  let message: string = "Something went very wrong";
  if (error instanceof Error) {
    message = error.message;
  }
  core.setFailed(message);
}
