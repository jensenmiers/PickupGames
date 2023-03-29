class Gym < ApplicationRecord
    has_many :games

    validates :game_start, presence: true
    validates :game_end, presence: true
    validates :capacity, presence: true

end
