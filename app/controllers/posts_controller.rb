class PostsController < ApplicationController
  include ActionController::Live
  def index
    @posts = Post.all.order("created_at asc").limit(10)
    last = Post.all.order("created_at").last
    @lastid = last.nil? ? "" : last.uid
  end

  def create
    unless params[:name].blank? || params[:message].blank?
      Post.create(user: params[:name], message: params[:message], uid: SecureRandom.uuid)
      publish
    end
    render nothing: true
  end

  def publish
    response.headers['Content-Type'] = 'text/event-stream'
    post = Post.all.order("created_at").last
    if post
      message = post.message
      name = post.user
      id = post.uid
      created = post.created_at.strftime("%-d/%b/%y @ %I:%M%p")
      sse = SSE.new(response.stream)
      begin
        sse.write({message_text: message, name: name, id: id, created: created}, event: "new_message")
      rescue IOError
        # Client Disconnected
      ensure
        sse.close
      end
    end
    render nothing: true
  end

end
