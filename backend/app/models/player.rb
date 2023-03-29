class Player < ApplicationRecord
    has_secure_password
    
    has_many :created_games, class_name: 'Game'
    has_many :signed_up_players
    has_many :attended_games, through: :signed_up_players, source: :game

    validates :username, presence: true, uniqueness: true
  end
  