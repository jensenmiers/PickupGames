# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_19_001822) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.datetime "game_start"
    t.datetime "game_end"
    t.integer "capacity"
    t.integer "donation"
    t.bigint "gym_id", null: false
    t.bigint "player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gym_id"], name: "index_games_on_gym_id"
    t.index ["player_id"], name: "index_games_on_player_id"
  end

  create_table "gyms", force: :cascade do |t|
    t.string "gym_name"
    t.text "address"
    t.integer "gym_phone_number"
    t.string "general_hours"
    t.text "parking_tips"
    t.string "membership_fees"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "player_email"
    t.integer "player_phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "signed_up_players", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "game_id", null: false
    t.boolean "donation_paid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_signed_up_players_on_game_id"
    t.index ["player_id"], name: "index_signed_up_players_on_player_id"
  end

  add_foreign_key "games", "gyms"
  add_foreign_key "games", "players"
  add_foreign_key "signed_up_players", "games"
  add_foreign_key "signed_up_players", "players"
end
