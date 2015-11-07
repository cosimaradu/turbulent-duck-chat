class PostsController < ApplicationController
  include ActionController::Live
  def index
    @posts = Post.all.order("created_at desc").limit(10)
  end

  def create
    response.headers['Content-Type'] = 'text/event-stream'
    post = Post.create(user: "Cosima", message: "Hello THERE")
    sse = SSE.new(response.stream)
    begin
        sse.write(post, event: "new_message")
    rescue IOError
      # Client Disconnected
    ensure
      sse.close
    end
    render nothing: true
  end
end
