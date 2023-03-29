class GymsController < ApplicationController

    def index
        render json: Gym.all 
    end

    def show
        gym = Gym.find(params[:id])
        render json: gym
    end

end
