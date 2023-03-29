class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_valid

    before_action :authorize

    private

    def authorize 
        @current_user = Player.find_by(id: session[:player_id])
        render json: { errors: ["Not authorized"]}, status: :unauthorized unless
        @current_user
    end

    def render_not_found(invalid)
        render json: {error: "#{invalid.model} not found"}, status: :not_found
    end

    def render_not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
