class PostsController < ApplicationController
  include ActionController::Live
  def index
    @posts = Post.all.order("created_at asc").limit(10)
  end

  def create
    response.headers['Content-Type'] = 'text/event-stream'
    Post.create(user: params[:name], message: params[:message])
    sse = SSE.new(response.stream)
    begin
        sse.write({message: params[:message], name: params[:name]}, event: "new_message")
    rescue IOError
      # Client Disconnected
    ensure
      sse.close
    end
    render nothing: true
  end
end
