class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :username
      t.string :password_digest
      t.string :player_email
      t.integer :player_phone_number

      t.timestamps
    end
  end
end
