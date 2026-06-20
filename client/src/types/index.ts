// Shape of a GitHub repo returned from the GitHub API
export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

// Shape of a saved favorite returned from your own backend
export interface Favorite {
  id: number;
  repo_id: string;
  repo_name: string;
  repo_url: string;
}
