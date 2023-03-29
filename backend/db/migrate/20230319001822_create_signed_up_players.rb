class CreateSignedUpPlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :signed_up_players do |t|
      t.references :player, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true
      t.boolean :donation_paid

      t.timestamps
    end
  end
end
