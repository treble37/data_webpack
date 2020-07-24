# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :data_webpack,
  ecto_repos: [DataWebpack.Repo]

# Configures the endpoint
config :data_webpack, DataWebpackWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NtzKUF4Sq5uWfBzQx72lEdVVrFg8fXF85o0Lz1QGqhRF+JnX4IeaIYhWisArsUfT",
  render_errors: [view: DataWebpackWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: DataWebpack.PubSub,
  live_view: [signing_salt: "9Rjh2vYj"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
