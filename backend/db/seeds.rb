# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Player.destroy_all
Gym.destroy_all
Game.destroy_all
SignedUpPlayer.destroy_all
puts "Deleting old data"

puts "Creating Gyms, Players, Games, and Signed up players" 

gym1 = Gym.create(
  gym_name: "Bancroft School",
  address: "123 Main St, Anytown USA",
  gym_phone_number: "555-1234",
  general_hours: "9am-9pm Mon-Fri, 10am-6pm Sat-Sun",
  parking_tips: "parking lot available, free street parking nearby",
  membership_fees: "None"
)

gym2 = Gym.create(
  gym_name: "LA Fitness",
  address: "456 2nd Ave, Anytown USA",
  gym_phone_number: "555-5678",
  general_hours: "24/7",
  parking_tips: "parking lot available, no street parking",
  membership_fees: "$75/month for basic membership, $150/month for premium membership"
)

# Create some players
player1 = Player.create(
  username: "johndoe",
  password: "1234",
  player_email: "johndoe@example.com",
  player_phone_number: "555-5555"
)

player2 = Player.create(
  username: "janesmith",
  password: "1234",
  player_email: "janesmith@example.com",
  player_phone_number: "555-6666"
)

# Create some games
game1 = Game.create(
  game_start: DateTime.new(2022, 4, 1, 10),
  game_end: DateTime.new(2022, 4, 1, 12),
  capacity: 10,
  gym: gym1,
  donation: 5,
  player: player1
)

game2 = Game.create(
  game_start: DateTime.new(2022, 4, 2, 14),
  game_end: DateTime.new(2022, 4, 2, 16),
  capacity: 8,
  gym: gym2,
  donation: 10,
  player: player2
)

# Create some signed up players
SignedUpPlayer.create(player: player1, game: game2, donation_paid: true)
SignedUpPlayer.create(player: player2, game: game1, donation_paid: false)

puts "Seeding done "