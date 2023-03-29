class SessionsController < ApplicationController
  
  skip_before_action :authorize, only: :create
  
  def create 
    player = Player.find_by(username: params[:username])
    if player&.authenticate(params[:password])
      session[:player_id] = player.id
      render json: player
    else
      render json: { errors: ["Invalid username or password"]}, status: :unauthorized
    end
  end

  def destroy
    # session.delete :player_id
    session.clear
    head :no_content
  end
end
