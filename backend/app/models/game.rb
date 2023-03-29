class Game < ApplicationRecord
  belongs_to :gym
  belongs_to :player
  has_many :signed_up_players, dependent: :destroy
  has_many :attendees, through: :signed_up_players, source: :player
end
