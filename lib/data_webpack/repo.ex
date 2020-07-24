defmodule DataWebpack.Repo do
  use Ecto.Repo,
    otp_app: :data_webpack,
    adapter: Ecto.Adapters.Postgres
end
