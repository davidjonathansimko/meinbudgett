import { supabase } from '../config/supabase';

// Budget für den eingeloggten User laden
export const fetchBudget = async (): Promise<number> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        // Falls nicht eingeloggt, aus localStorage laden
        const saved = localStorage.getItem('budget');
        return saved ? parseFloat(saved) : 0;
    }

    const { data, error } = await supabase
        .from('budgets')
        .select('amount')
        .eq('user_id', user.id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            // Kein Budget gefunden, Standardwert zurückgeben
            return 0;
        }
        console.error('Fehler beim Laden des Budgets:', error);
        throw error;
    }

    return data?.amount || 0;
};

// Budget für den eingeloggten User speichern
export const saveBudget = async (amount: number): Promise<void> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        // Falls nicht eingeloggt, in localStorage speichern
        localStorage.setItem('budget', amount.toString());
        return;
    }

    const { error } = await supabase
        .from('budgets')
        .upsert({
            user_id: user.id,
            amount: amount,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'user_id'
        });

    if (error) {
        console.error('Fehler beim Speichern des Budgets:', error);
        throw error;
    }

    // Auch in localStorage speichern als Backup
    localStorage.setItem('budget', amount.toString());
};
