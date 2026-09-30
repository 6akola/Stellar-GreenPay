"use strict";

/**
 * 012_referrals
 *
 * Referral system: track who referred whom and award a 5 XLM badge XP bonus
 * when the referred donor makes their first donation. The referrals table
 * records the relationship; referral stats are denormalized onto profiles
 * for fast reads.
 */
module.exports = {
  name: "012_referrals",

  async up(client) {
    await client.query(`
      CREATE TABLE IF NOT EXISTS referrals (
        id               UUID PRIMARY KEY,
        referrer_address TEXT NOT NULL,
        referred_address TEXT NOT NULL,
        bonus_awarded   BOOLEAN NOT NULL DEFAULT FALSE,
        first_donation_id UUID,
        first_donation_at TIMESTAMPTZ,
        bonus_xlm        NUMERIC(20, 7) NOT NULL DEFAULT 0,
        created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (referrer_address, referred_address)
      )
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_referrals_referred_address
      ON referrals (referred_address)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_referrals_referrer_address
      ON referrals (referrer_address)
    `);

    // Denormalized referral stats on profiles for fast reads.
    await client.query(`
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_count INTEGER NOT NULL DEFAULT 0
    `);
    await client.query(`
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referral_bonus_xlm NUMERIC(20, 7) NOT NULL DEFAULT 0
    `);
    await client.query(`
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by TEXT
    `);
  },

  async down(client) {
    await client.query("DROP INDEX IF EXISTS idx_referrals_referrer_address");
    await client.query("DROP INDEX IF EXISTS idx_referrals_referred_address");
    await client.query("DROP TABLE IF EXISTS referrals");
    await client.query("ALTER TABLE profiles DROP COLUMN IF EXISTS referred_by");
    await client.query("ALTER TABLE profiles DROP COLUMN IF EXISTS referral_bonus_xlm");
    await client.query("ALTER TABLE profiles DROP COLUMN IF EXISTS referral_count");
  },
};
