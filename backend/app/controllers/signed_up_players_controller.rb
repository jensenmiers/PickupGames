class SignedUpPlayersController < ApplicationController

    # def index
    #     all_rsvps = SignedUpPlayer.all
    #     render json: all_rsvps, include: [:player, :game]
    # end

    def index
      if params[:player_id]
        all_rsvps = SignedUpPlayer.where(player_id: params[:player_id])
      else
        all_rsvps = SignedUpPlayer.all
      end
      render json: all_rsvps, include: [:player, :game]
    end

    def show
        single_rsvp = SignedUpPlayer.find(params[:id])
        render json: single_rsvp, include: [:player, :game]
    end

    def create
        new_RSVP = @current_user.signed_up_players.create!(rsvp_params)
        render json: new_RSVP, include: [:player, :game]
    end
    
      def destroy
        delete_rsvp = @current_user.signed_up_players.find(params[:id])
        delete_rsvp.destroy
        head :no_content
      end

    #   def my_rsvps
    #     my_rsvps = @current_user.signed_up_players
    #     render json: my_rsvps, include: [:player, :game]
    #   end

      # def my_rsvps
      #   player = Player.find(params[:player_id])
      #   my_rsvps = player.signed_up_players
      #   render json: my_rsvps, include: [:player, :game]
      # end

    private

    def rsvp_params
      params.permit(:player_id, :game_id, :donation_paid)
    end

end
