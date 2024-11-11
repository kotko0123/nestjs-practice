module.exports = {
  apps: [
    {
      name: "nestjs-practice",
      script: "./dist/main.js",
      instances: "10",
      exec_mode: "cluster",
      // autorestart: true,
      // max_memory_restart: "1G",
      // exp_backoff_restart_delay: 100,
      // max_restarts: 10,
      // restart_delay: 3000,
      error_file: "/dev/null",
      out_file: "/dev/null",
      log_file: "./logs/app.log",
      // log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      kill_timeout: 30000,
      // min_uptime: "5s",
      wait_ready: true,
      listen_timeout: 100,
    }
  ],
};