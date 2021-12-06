import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const payload = github.context.payload;
    const comment = payload.comment;
    const token = core.getInput("github_token");

    if (!token) {
      core.setFailed("Missing github token");
      return;
    }

    if (comment && comment.body && comment.body === "@visual ok") {
      const octokit = github.getOctokit(token);

      const repository = payload.repository;

      if (repository) {
        const repo = repository.name;
        const owner = repository.owner.login;
        const issue = payload.issue;

        if (issue) {
          const response = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: issue.number,
          });
          console.info(JSON.stringify(response, undefined, 2));
        }

        // const response = await octokit.rest.checks.listForRef({
        //   owner,
        //   repo,
        //   ref: "",
        // });
      }

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
}

run();
