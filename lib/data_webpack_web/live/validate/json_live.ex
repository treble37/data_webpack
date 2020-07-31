defmodule DataWebpackWeb.Validate.JsonLive do
  use DataWebpackWeb, :live_view
  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, json_code: "", info: nil, error: nil)}
  end

  @impl true
  def handle_event("validate_json", %{"json_code" => code}, socket) do
    case Jason.decode(code) do
      {:ok, _result} ->
        {:noreply, assign(socket, json_code: code, info: "Valid JSON!", error: nil)}

      {:error, _error} ->
        {:noreply, assign(socket, json_code: code, info: nil, error: "Invalid JSON!")}
    end
  end
end
