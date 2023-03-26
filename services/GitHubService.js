const fetch = require('node-fetch');
const config = require('../config.json');

class GitHubService {
  static async fetchCommits(repo) {
    const url = `https://api.github.com/repos/${repo}/commits`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${config.githubToken}`,
      },
    });

    const data = await response.json();
    return data.slice(0, 5);
  }

  static createEmbed(repo, commits) {
    const embed = {
      title: `Latest Commits in ${repo}`,
      color: 3066993,
      fields: commits.map((commit) => ({
        name: `${commit.commit.message.split('\n')[0]} (${commit.sha.substring(0, 7)})`,
        value: `By ${commit.author.login}\n[View on GitHub](${commit.html_url})`,
        inline: false,
      })),
    };

    return embed;
  }
}

module.exports = GitHubService;
