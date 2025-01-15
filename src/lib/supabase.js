import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'division-builds-auth',
    storage: window.localStorage
  }
});

// Auth helper functions
export const auth = {
  // Sign up a new user
  signUp: async ({ email, password, username }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign in with Discord
  signInWithDiscord: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify email',
      },
    });
    return { data, error };
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'profile email',
      },
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Refresh session
  refreshSession: async () => {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    return { session, error };
  },
};

// Database helper functions
export const db = {
  // Builds
  builds: {
    // Create a new build
    create: async (buildData) => {
      const { data, error } = await supabase
        .from('builds')
        .insert([{ ...buildData, created_at: new Date() }])
        .select()
        .single();
      return { data, error };
    },

    // Get a build by ID
    getById: async (id) => {
      const { data, error } = await supabase
        .from('builds')
        .select(`
          *,
          users:user_id (username),
          likes:build_likes (user_id)
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    // Get all builds with filters
    getAll: async ({ sort = 'created_at', order = 'desc', filters = {} }) => {
      let query = supabase
        .from('builds')
        .select(`
          *,
          users:user_id (username),
          likes:build_likes (count)
        `);

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            query = query.contains(key, value);
          } else {
            query = query.eq(key, value);
          }
        }
      });

      // Apply sorting
      query = query.order(sort, { ascending: order === 'asc' });

      const { data, error } = await query;
      return { data, error };
    },

    // Update a build
    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('builds')
        .update({ ...updates, updated_at: new Date() })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    // Delete a build
    delete: async (id) => {
      const { error } = await supabase
        .from('builds')
        .delete()
        .eq('id', id);
      return { error };
    },

    // Like/unlike a build
    toggleLike: async (buildId, userId) => {
      const { data: existingLike } = await supabase
        .from('build_likes')
        .select()
        .eq('build_id', buildId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        const { error } = await supabase
          .from('build_likes')
          .delete()
          .eq('build_id', buildId)
          .eq('user_id', userId);
        return { data: { liked: false }, error };
      } else {
        const { error } = await supabase
          .from('build_likes')
          .insert([{ build_id: buildId, user_id: userId }]);
        return { data: { liked: true }, error };
      }
    },
  },

  // User profiles
  profiles: {
    // Get a user's profile
    getById: async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      return { data, error };
    },

    // Get a user's profile by username
    getByUsername: async (username) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
      
      return { data, error };
    },

    // Update a user's profile
    update: async (userId, updates) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      return { data, error };
    },

    // Upload avatar image
    uploadAvatar: async (userId, file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        return { error: uploadError };
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId)
        .select()
        .single();

      return { data, error: updateError };
    }
  },

  // Comments
  comments: {
    // Create a comment
    create: async (commentData) => {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ ...commentData, created_at: new Date() }])
        .select()
        .single();
      return { data, error };
    },

    // Get comments for a build
    getByBuildId: async (buildId) => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          users:user_id (username)
        `)
        .eq('build_id', buildId)
        .order('created_at', { ascending: false });
      return { data, error };
    },

    // Delete a comment
    delete: async (id) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
      return { error };
    },
  },
}; 