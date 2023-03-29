class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.datetime :game_start
      t.datetime :game_end
      t.integer :capacity
      t.integer :donation
      t.references :gym, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
