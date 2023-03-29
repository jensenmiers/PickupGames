class GamesController < ApplicationController

    def index ## get ALL games
        render json: Game.all, include: [:gym, :player]
    end

    def show
        game = Game.find(params[:id])
        render json: game, include: [:gym, :player]
    end

    def create
        game = @current_user.created_games.create!(game_params)
        render json: game, include: [:gym, :player], status: :created
    end

    def destroy
        game = @current_user.created_games.find(params[:id])
        game.destroy
        head :no_content
    end

    def update
        game = @current_user.created_games.find(params[:id])
        if game.update(game_params)
            render json: game, include: [:gym, :player]
        else
            render json: { error: game.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def signed_up_players
        game = Game.find(params[:id])
        signed_up_players = game.signed_up_players
        render json: signed_up_players
    end

    private

    def game_params
        params.permit(:game_start, :game_end, :capacity, :gym_id, :donation)
    end

end
