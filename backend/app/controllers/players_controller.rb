class PlayersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        @player = Player.create!(user_params)
        session[:player_id] = @player.id
        render json: @player, status: :created
    end

    def index
        @players = Player.all
        render json: @players
    end

    def show
        @current_user = Player.find(session[:player_id])
        render json: @current_user
    end

    def update
        @current_user = Player.find(session[:player_id])
        @current_user.update(update_user_params)
        render json: @current_user
    end


    private
    def user_params
        params.permit(:username, :password, :player_email, :player_phone_number)
    end

    def update_user_params
        params.permit(:username,:player_email, :player_phone_number)
    end

end
