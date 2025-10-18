/*:
 * @target MZ
 * @plugindesc Système de Quête Complet (Principale/Secondaire, Journal, Cible Visuelle, Chaînage, Récompenses complètes).
 * @author Zephiell
 *
 * @param --- Quêtes ---
 *
 * @param Quêtes
 * @type struct<Quest>[]
 * @desc Liste de toutes les quêtes du jeu.
 * @default []
 *
 * * @desc Les paramètres du panneau ont été retirés.
 *
 * @param --- Raccourcis ---
 *
 * @param Quest Log Hotkey
 * @type select
 * @option None
 * @option Q
 * @option W
 * @option E
 * @option R
 * @option T
 * @option A
 * @option S
 * @option D
 * @option F
 * @option G
 * @option L
 * @option J
 * @option K
 * @option C
 * @option V
 * @option B
 * @text Touche Raccourci Journal
 * @desc Touche clavier pour ouvrir le Journal de Quêtes depuis la carte.
 * @default None
 *
 * @param --- Journal UI ---
 *
 * @param List Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Taille Police (Liste)
 * @default 20
 *
 * @param Detail Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Taille Police (Détails)
 * @default 22
 *
 * @param Status Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Taille Police (Statut Bas)
 * @default 20
 *
 * @param Detail Title Color
 * @type number
 * @min 0
 * @max 31
 * @text Couleur Titre Détails (Index)
 * @default 16
 *
 * @param Detail Text Color
 * @type number
 * @min 0
 * @max 31
 * @text Couleur Texte Détails (Index)
 * @default 0
 *
 * @param Completed Quest Color
 * @type number
 * @min 0
 * @max 31
 * @text Couleur Quête Terminée (Liste)
 * @default 7
 *
 * @param Label Status
 * @type text
 * @text Libellé "Statut:"
 * @default Statut:
 *
 * @param Label Objectives
 * @type text
 * @text Libellé "Objectif:"
 * @default Objectif:
 *
 * @param Label Rewards
 * @type text
 * @text Libellé "Récompenses:"
 * @default Récompenses:
 *
 *
 *
 * @param Show Quest Messages
 * @type boolean
 * @text Afficher Messages de Quête
 * @desc Affiche les messages lors du démarrage/completion/abandon de quête.
 * @default true
 *
 * @param --- Options ---
 *
 * @param Pointer Settings
 * @type struct<PointerSettings>
 * @text Paramètres du Pointeur
 * @desc Groupe de paramètres pour le pointeur de quête.
 * @default {"enabled":"true","color":"#4DB2FF","opacity":"255"}
 *
 * @param MenuSwitchId
 * @type switch
 * @text Interrupteur d'Affichage du Menu
 * @desc Le Journal de Quêtes n'apparaît dans le menu que si cet interrupteur est ON. Laissez 0 pour toujours afficher (si 'Afficher dans le Menu' est vrai).
 * @default 0
 *
 * @param Show In Menu
 * @type boolean
 * @text Afficher dans le Menu (MZ Standard)
 * @desc Ajoute la commande "Journal de Quêtes" au menu principal (À utiliser si l'intégration VisuMZ est bloquée).
 * @default true
 *
 * @param Menu Command Name
 * @type text
 * @text Nom de la Commande Menu
 * @desc Le nom de la commande dans le menu principal.
 * @default Journal de Quêtes
 *
 * @command start
 * @text 1. Démarrer Quête
 * @desc Démarre une quête spécifique.
 *
 * @arg questId
 * @type text
 *
 * @command complete
 * @text 2. Terminer Quête
 * @desc Termine une quête spécifique et applique la récompense. Déclenche le chaînage automatique.
 *
 * @arg questId
 * @type text
 *
 * @command setTarget
 * @text 3. Définir Cible de Quête
 * @desc Définit les coordonnées (carte et position) du prochain objectif visuel.
 *
 * @arg mapId
 * @type number
 *
 * @arg targetX
 * @type number
 *
 * @arg targetY
 * @type number
 *
 * @arg targetName
 * @type text
 * @default Objectif de Quête
 *
 * @command clearTarget
 * @text 4. Effacer Cible Visuelle
 * @desc Efface la cible de quête actuellement tracée.
 *
 * @command checkAndAdvance
 * @text 5. Vérifier et Avancer Quête
 * @desc Vérifie si le joueur possède l'objet requis pour avancer/terminer.
 *
 * @arg questId
 * @type text
 *
 * @arg itemId
 * @type item
 * @text Objet Requis
 *
 * @arg quantity
 * @type number
 * @default 1
 *
 * @arg remove
 * @type boolean
 * @text Retirer l'Objet ?
 * @default true
 *
 * @arg isFinal
 * @type boolean
 *
 * @text Est l'Étape Finale ?
 * @default true
 *
 * @help
 * ============================================================================
 * QSM VisuMZ v1.0.0
 * ============================================================================ 
 * -----------------------------------------------------------------
 * A. INFORMATIONS & ORDRE DES PLUGINS
 * -----------------------------------------------------------------
 * - Placez QuestSystemManager AVANT `VisuMZ_1_MainMenuCore`.
 * - Le Journal peut être ajouté au menu standard ou conditionné par un interrupteur.
 *
 * -----------------------------------------------------------------
 * B. COMPORTEMENT DU JOURNAL
 * -----------------------------------------------------------------
 * - Panneau latéral de carte: SUPPRIMÉ. Il n'existe plus dans cette version.
 * - Raccourci clavier (optionnel): `Quest Log Hotkey` permet d'ouvrir le Journal
 * directement depuis la carte (ex: Q, L…). Mettre "None" pour désactiver.
 * - Messages de quête: activables via le paramètre "Afficher Messages de Quête".
 *
 * -----------------------------------------------------------------
 * C. CONTRÔLE PAR INTERRUPTEURS (PAR QUÊTE)
 * -----------------------------------------------------------------
 * - Interrupteur de Démarrage/Abandon: 
 * ON = démarre la quête, OFF = abandonne si active.
 * - Interrupteur de Complétion: 
 * ON = termine la quête si elle est active.
 * - Astuce: Ajoutez une première quête (même vide) au début du jeu si besoin
 * pour afficher correctement les statuts.
 *
 * -----------------------------------------------------------------
 * D. MENU PRINCIPAL
 * -----------------------------------------------------------------
 * - `Afficher dans le Menu`: ajoute la commande Journal de Quêtes au menu.
 * - `Interrupteur d'Affichage du Menu`: si > 0, le Journal n'apparaît que si l'interrupteur est ON.
 * - Compatible VisuMZ MainMenuCore: un correctif garantit que le handler existe.
 *
 * -----------------------------------------------------------------
 * E. MARQUEUR / CIBLE DE QUÊTE
 * -----------------------------------------------------------------
 * - Paramètres de pointeur groupés dans "Pointer Settings" (actif, couleur, opacité).
 * - Commandes de plugin: `setTarget`, `clearTarget`.
 *
 *
 * */

/*~struct~Quest:
 * @param id
 * @type text
 * @text ID Unique
 * @default q001
 *
 * @param switchId
 * @type switch
 * @text Interrupteur de Démarrage/Abandon
 * @desc La quête démarre quand cet interrupteur passe à ON et est abandonnée quand il passe à OFF. Laissez 0 pour désactiver.
 * @default 0
 *
 * @param completeSwitchId
 * @type switch
 * @text Interrupteur de Complétion
 * @desc La quête est complétée quand cet interrupteur passe à ON. Laissez 0 pour désactiver.
 * @default 0
 *
 * @param type
 * @type select
 * @option Principale
 * @option Secondaire
 * @text Type de Quête
 * @default Principale
 *
 * @param name
 * @type text
 * @text Nom de la Quête
 * @default Nouvelle Quête
 *
 * @param description
 * @type multiline
 * @text Description
 * @default Objectif.
 *
 * @param nextQuestId
 * @type text
 * @text ID de la Quête Suivante
 * @desc La quête à démarrer AUTOMATIQUEMENT après la complétion de celle-ci.
 * @default 
 *
 * @param goldReward
 * @type number
 * @text Récompense en Or
 * @default 100
 *
 * @param itemReward
 * @type item
 * @text Objet Récompense
 * @default 0
 *
 * @param actorReward
 * @type actor
 * @text Personnage Récompense
 * @desc Le personnage qui rejoint l'équipe à la fin de la quête (ID).
 * @default 0
 *
 * @param targetMapId
 * @type number
 * @text Carte Cible (Pointeur)
 * @desc ID de carte où placer le pointeur pour cette quête (0 = aucun).
 * @default 0
 *
 * @param targetX
 * @type number
 * @text X Cible
 * @default 0
 *
 * @param targetY
 * @type number
 * @text Y Cible
 * @default 0
 *
 * @param targetName
 * @type text
 * @text Nom de la Cible
 * @default Objectif de Quête
 *
 * @param pointerColor
 * @type string
 * @text Couleur du Pointeur (Quête)
 * @default #4DB2FF
 *
 * @param pointerOpacity
 * @type number
 * @min 0
 * @max 255
 * @text Opacité du Pointeur (Quête)
 * @default 255
 */

/*~struct~PointerSettings:
 * @param enabled
 * @type boolean
 * @text Activer le Pointeur
 * @default true
 *
 * @param color
 * @type string
 * @text Couleur (#RRGGBB)
 * @default #4DB2FF
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @text Opacité (0-255)
 * @default 255
 */

/*~english:
 * @plugindesc Complete Quest System (Main/Side, Log, Visual Target, Chaining, Full Rewards).
 * @author Zephiell
 *
 * @param --- Quêtes ---
 * @text --- Quests ---
 *
 * @param Quêtes
 * @text Quests
 * @type struct<Quest>[]
 * @desc List of all quests in the game.
 * @default []
 *
 * * @desc Panel parameters have been removed.
 *
 * @param --- Raccourcis ---
 * @text --- Shortcuts ---
 *
 * @param Quest Log Hotkey
 * @type select
 * @option None
 * @option Q
 * @option W
 * @option E
 * @option R
 * @option T
 * @option A
 * @option S
 * @option D
 * @option F
 * @option G
 * @option L
 * @option J
 * @option K
 * @option C
 * @option V
 * @option B
 * @text Log Hotkey
 * @desc Keyboard key to open the Quest Log from the map.
 * @default None
 *
 * @param --- Journal UI ---
 * @text --- Log UI ---
 *
 * @param List Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Font Size (List)
 * @default 20
 *
 * @param Detail Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Font Size (Details)
 * @default 22
 *
 * @param Status Font Size
 * @type number
 * @min 12
 * @max 48
 * @text Font Size (Bottom Status)
 * @default 20
 *
 * @param Detail Title Color
 * @type number
 * @min 0
 * @max 31
 * @text Detail Title Color (Index)
 * @default 16
 *
 * @param Detail Text Color
 * @type number
 * @min 0
 * @max 31
 * @text Detail Text Color (Index)
 * @default 0
 *
 * @param Completed Quest Color
 * @type number
 * @min 0
 * @max 31
 * @text Completed Quest Color (List)
 * @default 7
 *
 * @param Label Status
 * @type text
 * @text Label "Status:"
 * @default Status:
 *
 * @param Label Objectives
 * @type text
 * @text Label "Objective:"
 * @default Objective:
 *
 * @param Label Rewards
 * @type text
 * @text Label "Rewards:"
 * @default Rewards:
 *
 *
 *
 * @param Show Quest Messages
 * @type boolean
 * @text Show Quest Messages
 * @desc Displays messages when a quest starts/completes/abandons.
 * @default true
 *
 * @param --- Options ---
 * @text --- Options ---
 *
 * @param Pointer Settings
 * @type struct<PointerSettings>
 * @text Pointer Settings
 * @desc Group of parameters for the quest pointer.
 * @default {"enabled":"true","color":"#4DB2FF","opacity":"255"}
 *
 * @param MenuSwitchId
 * @type switch
 * @text Menu Display Switch
 * @desc The Quest Log only appears in the menu if this switch is ON. Leave 0 to always display (if 'Show In Menu' is true).
 * @default 0
 *
 * @param Show In Menu
 * @type boolean
 * @text Show In Menu (MZ Standard)
 * @desc Adds the "Quest Log" command to the main menu (Use if VisuMZ integration is blocked).
 * @default true
 *
 * @param Menu Command Name
 * @type text
 * @text Menu Command Name
 * @desc The name of the command in the main menu.
 * @default Quest Log
 *
 * @command start
 * @text 1. Start Quest
 * @desc Starts a specific quest.
 *
 * @arg questId
 * @type text
 *
 * @command complete
 * @text 2. Complete Quest
 * @desc Completes a specific quest and applies the reward. Triggers automatic chaining.
 *
 * @arg questId
 * @type text
 *
 * @command setTarget
 * @text 3. Set Quest Target
 * @desc Sets the coordinates (map and position) of the next visual objective.
 *
 * @arg mapId
 * @type number
 *
 * @arg targetX
 * @type number
 *
 * @arg targetY
 * @type number
 *
 * @arg targetName
 * @type text
 * @default Quest Objective
 *
 * @command clearTarget
 * @text 4. Clear Visual Target
 * @desc Clears the currently tracked quest target.
 *
 * @command checkAndAdvance
 * @text 5. Check and Advance Quest
 * @desc Checks if the player has the required item to advance/complete.
 *
 * @arg questId
 * @type text
 *
 * @arg itemId
 * @type item
 * @text Required Item
 *
 * @arg quantity
 * @type number
 * @default 1
 *
 * @arg remove
 * @type boolean
 * @text Remove Item?
 * @default true
 *
 * @arg isFinal
 * @type boolean
 *
 * @text Is This The Final Step?
 * @default true
 *
 * @help
 * ============================================================================
 * QSM VisuMZ v1.0.0
 * ============================================================================ 
 * -----------------------------------------------------------------
 * A. INFORMATION & PLUGIN ORDER
 * -----------------------------------------------------------------
 * - Place QuestSystemManager BEFORE `VisuMZ_1_MainMenuCore`.
 * - The Log can be added to the standard menu or conditioned by a switch.
 *
 * -----------------------------------------------------------------
 * B. LOG BEHAVIOR
 * -----------------------------------------------------------------
 * - Map Side Panel: REMOVED. It no longer exists in this version.
 * - Keyboard Shortcut (optional): `Quest Log Hotkey` allows opening the Log
 * directly from the map (e.g., Q, L...). Set to "None" to disable.
 * - Quest Messages: can be enabled via the "Show Quest Messages" parameter.
 *
 * -----------------------------------------------------------------
 * C. CONTROL BY SWITCHES (PER QUEST)
 * -----------------------------------------------------------------
 * - Start/Abandon Switch: 
 * ON = starts the quest, OFF = abandons if active.
 * - Completion Switch: 
 * ON = completes the quest if it is active.
 * - Tip: Add a first quest (even an empty one) at the beginning of the game if needed
 * to display statuses correctly.
 *
 * -----------------------------------------------------------------
 * D. MAIN MENU
 * -----------------------------------------------------------------
 * - `Show In Menu`: adds the Quest Log command to the main menu.
 * - `Menu Display Switch`: if > 0, the Log only appears if the switch is ON.
 * - VisuMZ MainMenuCore Compatible: a patch ensures the handler exists.
 *
 * -----------------------------------------------------------------
 * E. QUEST MARKER / TARGET
 * -----------------------------------------------------------------
 * - Pointer parameters grouped in "Pointer Settings" (enabled, color, opacity).
 * - Plugin Commands: `setTarget`, `clearTarget`.
 *
 *
 * */

/*~struct~Quest:
 * @param id
 * @type text
 * @text Unique ID
 * @default q001
 *
 * @param switchId
 * @type switch
 * @text Start/Abandon Switch
 * @desc The quest starts when this switch is turned ON and is abandoned when it is turned OFF. Leave 0 to disable.
 * @default 0
 *
 * @param completeSwitchId
 * @type switch
 * @text Completion Switch
 * @desc The quest is completed when this switch is turned ON. Leave 0 to disable.
 * @default 0
 *
 * @param type
 * @type select
 * @option Main
 * @option Side
 * @text Quest Type
 * @default Main
 *
 * @param name
 * @type text
 * @text Quest Name
 * @default New Quest
 *
 * @param description
 * @type multiline
 * @text Description
 * @default Objective.
 *
 * @param nextQuestId
 * @type text
 * @text Next Quest ID
 * @desc The quest to start AUTOMATICALLY after this one is completed.
 * @default 
 *
 * @param goldReward
 * @type number
 * @text Gold Reward
 * @default 100
 *
 * @param itemReward
 * @type item
 * @text Item Reward
 * @default 0
 *
 * @param actorReward
 * @type actor
 * @text Actor Reward
 * @desc The actor who joins the party at the end of the quest (ID).
 * @default 0
 *
 * @param targetMapId
 * @type number
 * @text Target Map ID (Pointer)
 * @desc Map ID to place the pointer for this quest (0 = none).
 * @default 0
 *
 * @param targetX
 * @type number
 * @text Target X
 * @default 0
 *
 * @param targetY
 * @type number
 * @text Target Y
 * @default 0
 *
 * @param targetName
 * @type text
 * @text Target Name
 * @default Quest Objective
 *
 * @param pointerColor
 * @type string
 * @text Pointer Color (Quest)
 * @default #4DB2FF
 *
 * @param pointerOpacity
 * @type number
 * @min 0
 * @max 255
 * @text Pointer Opacity (Quest)
 * @default 255
 */

/*~struct~PointerSettings:
 * @param enabled
 * @type boolean
 * @text Enable Pointer
 * @default true
 *
 * @param color
 * @type string
 * @text Color (#RRGGBB)
 * @default #4DB2FF
 *
 * @param opacity
 * @type number
 * @min 0
 * @max 255
 * @text Opacity (0-255)
 * @default 255
 */
// FIN DE LA TRADUCTION ANGLAISE

(() => {
    const pluginName = "QuestSystemManager";
    
    // --- Initialisation et Configuration des Données ---
    const parameters = PluginManager.parameters(pluginName);
    const questData = JSON.parse(parameters['Quêtes'] || "[]").map(str => JSON.parse(str));
    const showInMenu = parameters['Show In Menu'] === 'true';
    const showQuestMessages = parameters['Show Quest Messages'] !== 'false';
    const sidebarTitle = 'Quêtes en cours';
    const sidebarOpacity = 0;
    const sidebarTitleColorIndex = 16;
    const sidebarTextColorIndex = 0;
    const sidebarSystemColorIndex = 16;
    const sidebarFontSize = 20;
    const questLogHotkey = String(parameters['Quest Log Hotkey'] || 'None');
    const showLeftPanelDefault = false;
    const leftPanelWidth = 260;
    const panelSideDefault = 'left';
    const panelHeightDefault = 0;
    const allowOptionsToggle = false;
    const optionsToggleName = '';
    const allowPanelConfigSubmenu = false;
    const panelConfigCommandName = '';
    // Lecture groupée (avec rétrocompatibilité si anciens paramètres présents)
    let pointerGroup = parameters['Pointer Settings'];
    try { pointerGroup = pointerGroup ? JSON.parse(pointerGroup) : null; } catch (e) { pointerGroup = null; }
    const questPointerEnabled = pointerGroup ? (String(pointerGroup.enabled) === 'true') : (parameters['Enable Quest Pointer'] !== 'false');
    const pointerColor = pointerGroup ? (pointerGroup.color || '#4DB2FF') : String(parameters['Pointer Color'] || '#4DB2FF');
    const pointerOpacity = pointerGroup ? Math.max(0, Math.min(255, Number(pointerGroup.opacity || 255))) : Math.max(0, Math.min(255, Number(parameters['Pointer Opacity'] || 255)));
    const menuCommandName = parameters['Menu Command Name'] || 'Journal de Quêtes';
    // UI du Journal
    const listFontSize = Math.max(12, Math.min(48, Number(parameters['List Font Size'] || 20)));
    const detailFontSize = Math.max(12, Math.min(48, Number(parameters['Detail Font Size'] || 22)));
    const statusFontSize = Math.max(12, Math.min(48, Number(parameters['Status Font Size'] || 20)));
    const detailTitleColorIndex = Math.max(0, Math.min(31, Number(parameters['Detail Title Color'] || 16)));
    const detailTextColorIndex = Math.max(0, Math.min(31, Number(parameters['Detail Text Color'] || 0)));
    const completedQuestColorIndex = Math.max(0, Math.min(31, Number(parameters['Completed Quest Color'] || 7)));
    const labelStatus = String(parameters['Label Status'] || 'Statut:');
    const labelObjectives = String(parameters['Label Objectives'] || 'Objectif:');
    const labelRewards = String(parameters['Label Rewards'] || 'Récompenses:');
    const menuSwitchId = Number(parameters['MenuSwitchId'] || 0); 

    const QUESTS = new Map();
    questData.forEach(q => QUESTS.set(q.id, q));

    // --- ConfigManager: Option pour activer/désactiver le panneau à gauche ---
    // Valeur par défaut issue des paramètres du plugin
    if (typeof ConfigManager.questLeftPanel === 'undefined') ConfigManager.questLeftPanel = !!showLeftPanelDefault;
    // Désactivation forcée du panneau latéral (retrait complet)
    ConfigManager.questLeftPanel = false;
    if (typeof ConfigManager.questPanelSide === 'undefined') ConfigManager.questPanelSide = panelSideDefault;
    if (typeof ConfigManager.questPanelWidth === 'undefined') ConfigManager.questPanelWidth = leftPanelWidth;
    if (typeof ConfigManager.questPanelHeight === 'undefined') ConfigManager.questPanelHeight = panelHeightDefault;
    const _ConfigManager_makeData_QSM = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData_QSM.call(this);
        config.questLeftPanel = false;
        config.questPanelSide = this.questPanelSide;
        config.questPanelWidth = this.questPanelWidth;
        config.questPanelHeight = this.questPanelHeight;
        return config;
    };
    const _ConfigManager_applyData_QSM = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData_QSM.call(this, config);
        this.questLeftPanel = false; // toujours désactivé
        this.questPanelSide = (config.questPanelSide === 'right') ? 'right' : 'left';
        this.questPanelWidth = Number(config.questPanelWidth || leftPanelWidth);
        this.questPanelWidth = Math.max(120, Math.min(640, this.questPanelWidth));
        this.questPanelHeight = Number(config.questPanelHeight || panelHeightDefault);
        this.questPanelHeight = Math.max(0, Math.min(1080, this.questPanelHeight));
    };

    // --- Extension de Game_System (Stockage des États et Cible) ---

    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this._activeQuests = { main: [], side: [] };
        this._completedQuests = { main: [], side: [] };
        this._currentQuestTarget = null;
        this._questSwitchStates = {}; 
        this._selectedQuestId = null;
        
        // >>> INITIALISATION DE TEST : ACTIVE LA PREMIÈRE QUÊTE SI AUCUNE N'EST ACTIVE <<<
        if (questData.length > 0 && this._activeQuests.main.length === 0 && this._activeQuests.side.length === 0) {
            const firstQuestId = questData[0].id;
            // Vérifie si la première quête existe vraiment dans la Map
            if (QUESTS.has(firstQuestId)) {
                this.startQuest(firstQuestId, false); // false pour ne pas spammer au démarrage
                if ($gameMessage) $gameMessage.clear();
            }
        }
    };
    
    // Accesseurs
    Game_System.prototype.getSelectedQuestId = function() { return this._selectedQuestId; };
    Game_System.prototype.setSelectedQuestId = function(questId) { this._selectedQuestId = questId || null; };

    Game_System.prototype.getQuestTarget = function() {
        if (!questPointerEnabled) return null;
        if (this._currentQuestTarget) return this._currentQuestTarget;
        const sid = this.getSelectedQuestId();
        if (!sid) return null;
        const q = QUESTS.get(sid);
        if (!q) return null;
        const mapId = Number(q.targetMapId || 0);
        if (mapId <= 0) return null;
        const x = Number(q.targetX || 0);
        const y = Number(q.targetY || 0);
        return {
            mapId: mapId,
            x: x,
            y: y,
            name: q.targetName || 'Objectif de Quête',
            questId: sid,
            color: q.pointerColor || pointerColor,
            opacity: typeof q.pointerOpacity !== 'undefined' ? Number(q.pointerOpacity) : pointerOpacity
        };
    };

    Game_System.prototype.getQuestPointerConfig = function() {
        return { enabled: questPointerEnabled, color: pointerColor, opacity: pointerOpacity };
    };
    Game_System.prototype.getActiveQuests = function(type) { return type === 'Principale' ? this._activeQuests.main : this._activeQuests.side; };
    Game_System.prototype.getCompletedQuests = function(type) { return type === 'Principale' ? this._completedQuests.main : this._completedQuests.side; };
    Game_System.prototype.getQuestData = function(questId) { return QUESTS.get(questId); };
    
    Game_System.prototype.getQuestList = function(questId, listType) {
        const quest = QUESTS.get(questId);
        if (!quest) return null;
        const type = quest.type.toLowerCase();
        if (listType === 'active') return type === 'principale' ? this._activeQuests.main : this._activeQuests.side;
        if (listType === 'completed') return type === 'principale' ? this._completedQuests.main : this._completedQuests.side;
        return null;
    };

    Game_System.prototype.isQuestActive = function(questId) {
        const activeList = this.getQuestList(questId, 'active');
        return activeList && activeList.includes(questId);
    };

    Game_System.prototype.isQuestCompleted = function(questId) {
        const completedList = this.getQuestList(questId, 'completed');
        return completedList && completedList.includes(questId);
    };
    
    // --- Aides d'affichage ---
    function wrapByWords(text, maxCharsPerLine) {
        const out = [];
        const words = String(text || '').split(/\s+/);
        let line = '';
        for (const word of words) {
            const next = line ? line + ' ' + word : word;
            if (next.length <= maxCharsPerLine) {
                line = next;
            } else {
                if (line) out.push(line);
                // si un mot dépasse la taille, on le segmente grossièrement
                if (word.length > maxCharsPerLine) {
                    let idx = 0;
                    while (idx < word.length) {
                        out.push(word.slice(idx, idx + maxCharsPerLine));
                        idx += maxCharsPerLine;
                    }
                    line = '';
                } else {
                    line = word;
                }
            }
        }
        if (line) out.push(line);
        return out;
    }

    // --- NOUVELLE FONCTION D'ASSISTANCE POUR L'AFFICHAGE DU MESSAGE ---
    Game_System.prototype.displayQuestUpdateMessage = function(quest, status) {
        if (!showQuestMessages || !$gameMessage) return;

        const type = quest.type === 'Principale' ? "Principale" : "Secondaire";

        if (status === 'start') {
            // Message de Démarrage de Quête (propre et coloré)
            $gameMessage.add(`\\C[6]Journal de quêtes mis à jour\\C[0]`);
            $gameMessage.add(`Nouvelle quête ${type} : \\C[2]${quest.name}\\C[0]`);

            const firstLine = quest.description.split('\n')[0].trim();
            if (firstLine) {
                $gameMessage.add(`Objectif:`);
                const wrapped = wrapByWords(firstLine, 48); // valeur sûre, compatible skins de messages
                for (const part of wrapped) $gameMessage.add(part);
            }

            let rewardMsg = `Récompenses: ${quest.goldReward} Or`;
            const itemId = Number(quest.itemReward);
            if (itemId > 0) rewardMsg += `, ${$dataItems[itemId].name}`;
            const actorId = Number(quest.actorReward);
            if (actorId > 0) rewardMsg += `, Nouvel allié`;
            $gameMessage.add(rewardMsg + `.`);

        } else if (status === 'abandon') {
            // Message d'Abandon de Quête (sans chevrons)
            $gameMessage.add(`Quête abandonnée : \\C[2]${quest.name}\\C[0]`);

        } else if (status === 'complete') {
            // Message de Complétion de Quête (propre et coloré)
            $gameMessage.add(`\\C[6]Quête ${type} terminée\\C[0] : \\C[2]${quest.name}\\C[0]`);

            let rewardMsg = `Récompenses obtenues: \\C[6]${quest.goldReward} Or\\C[0]`;
            const itemId = Number(quest.itemReward);
            if (itemId > 0) rewardMsg += `, ${$dataItems[itemId].name}`;

            const actorId = Number(quest.actorReward);
            if (actorId > 0) {
                if ($gameParty.members().some(actor => actor.actorId() === actorId)) {
                    rewardMsg += `, Nouvel allié`;
                }
            }

            $gameMessage.add(rewardMsg + `.`);
            if (actorId > 0 && !$gameParty.members().some(actor => actor.actorId() === actorId)) {
                $gameMessage.add(`${$dataActors[actorId].name} rejoint votre équipe !`);
            }
        }
    };
    
    // Ajout d'un paramètre 'displayMessage' pour éviter la double notification via commande
    Game_System.prototype.startQuest = function(questId, displayMessage = true) {
        // Ne démarre pas si déjà active ou complétée
        if (!QUESTS.has(questId) || this.isQuestActive(questId) || this.isQuestCompleted(questId)) return false;

        const activeList = this.getQuestList(questId, 'active');
        if (activeList) {
            activeList.push(questId);
            const quest = QUESTS.get(questId);
            
            if (displayMessage) {
                this.displayQuestUpdateMessage(quest, 'start');
            }
            return true;
        }
        return false;
    };

    Game_System.prototype.completeQuest = function(questId, displayMessage = true) {
        // Ne complète que si active et non déjà complétée
        if (this.isQuestActive(questId) && !this.isQuestCompleted(questId)) {
            const quest = QUESTS.get(questId);
            const completedList = this.getQuestList(questId, 'completed');

            // 1. Déplacer de la liste Active à Complétée
            this._activeQuests.main = this._activeQuests.main.filter(id => id !== questId);
            this._activeQuests.side = this._activeQuests.side.filter(id => id !== questId);
            completedList.push(questId);

            // 2. Distribuer les récompenses
            
            // Or
            $gameParty.gainGold(Number(quest.goldReward));
            
            // Objet
            const itemId = Number(quest.itemReward);
            if (itemId > 0) {
                $gameParty.gainItem($dataItems[itemId], 1);
            }
            
            // Personnage
            const actorId = Number(quest.actorReward);
            if (actorId > 0) {
                if (!$gameParty.members().some(actor => actor.actorId() === actorId)) {
                    $gameParty.addActor(actorId);
                }
            }

            // 3. Notifier le joueur
            if (displayMessage) {
                 this.displayQuestUpdateMessage(quest, 'complete');
            }
            
            // 4. Effacer la cible visuelle
            $gameSystem._currentQuestTarget = null;

            // 5. Logique de Chaînage
            const nextQuestId = quest.nextQuestId.trim();
            if (nextQuestId && QUESTS.has(nextQuestId)) {
                $gameSystem.startQuest(nextQuestId);
            }
            
            return true;
        }
        return false;
    };


    // --- LOGIQUE MISE À JOUR : Démarrage/Abandon/Complétion par Interrupteur (Messages Auto) ---

    Game_System.prototype.checkQuestSwitches = function() {
        for (const [id, quest] of QUESTS.entries()) {
            const startSwitchId = Number(quest.switchId);
            const completeSwitchId = Number(quest.completeSwitchId);

            const isActive = this.isQuestActive(id);
            const isCompleted = this.isQuestCompleted(id);

            const wasStartOn = this._questSwitchStates[`${id}_start`] || false;
            const wasCompleteOn = this._questSwitchStates[`${id}_complete`] || false;
            
            // --- GESTION DE L'INTERRUPTEUR DE DÉMARRAGE/ABANDON (startSwitchId) ---
            if (startSwitchId > 0 && !isCompleted) {
                const isCurrentStartOn = $gameSwitches.value(startSwitchId);

                // 1. Démarrer la quête (OFF -> ON)
                if (isCurrentStartOn && !wasStartOn) {
                    this.startQuest(id); // Appel à startQuest qui affiche maintenant le message
                } 
                
                // 2. Abandonner la quête (ON -> OFF) ET si elle est ACTUELLEMENT active
                else if (!isCurrentStartOn && wasStartOn && isActive) {
                    const questType = quest.type === 'Principale' ? 'main' : 'side';
                    
                    this._activeQuests[questType] = this._activeQuests[questType].filter(questId => questId !== id);
                    
                    if (this._currentQuestTarget && this._currentQuestTarget.questId === id) {
                         this._currentQuestTarget = null;
                    }

                    // Affiche le message d'abandon
                    this.displayQuestUpdateMessage(quest, 'abandon');
                }
                
                this._questSwitchStates[`${id}_start`] = isCurrentStartOn;
            }
            
            // --- GESTION DE L'INTERRUPTEUR DE COMPLÉTION (completeSwitchId) ---
            if (completeSwitchId > 0 && isActive && !isCompleted) {
                const isCurrentCompleteOn = $gameSwitches.value(completeSwitchId);

                // 3. Terminer la quête (OFF -> ON)
                if (isCurrentCompleteOn && !wasCompleteOn) {
                    this.completeQuest(id); // Appel à completeQuest qui affiche maintenant le message
                }

                this._questSwitchStates[`${id}_complete`] = isCurrentCompleteOn;
            }
        }
    };

    // Ajoute la vérification de l'interrupteur à la boucle de jeu (Map Update)
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.apply(this, arguments);
        if ($gameSystem) {
            $gameSystem.checkQuestSwitches();
        }
    };


    // --- Intégration dans le Menu Principal (Journal de Quêtes) ---
    
    // SCÈNE ET FENÊTRES DU JOURNAL DE QUÊTES 
    
    function Scene_QuestLog() { this.initialize(...arguments); }
    Scene_QuestLog.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_QuestLog.prototype.constructor = Scene_QuestLog;
    Scene_QuestLog.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._currentType = 'Principale';
    };
    
    const _Scene_QuestLog_create = Scene_QuestLog.prototype.create;
    Scene_QuestLog.prototype.create = function() {
        _Scene_QuestLog_create.apply(this, arguments);
        this.createQuestListWindow();
        this.createQuestDetailWindow();
        this.createStatusWindow();
        this._statusWindow.refresh();
        // Force une mise à jour complète après le câblage des fenêtres
        if (this._questListWindow) {
            this._questListWindow.refresh();
            this._questListWindow.activate();
        }
    };
    
    Scene_QuestLog.prototype.createQuestListWindow = function() {
        const rect = this.questListWindowRect();
        this._questListWindow = new Window_QuestList(rect);
        this._questListWindow.contents.fontSize = listFontSize;
        
        this._questListWindow.setHandler('cancel', this.popScene.bind(this));
        
        this._questListWindow.setHandler('pagedown', this.nextType.bind(this));
        this._questListWindow.setHandler('pageup', this.prevType.bind(this));
        this.addWindow(this._questListWindow);
        this._questListWindow.setQuestType(this._currentType);

        this._questListWindow.activate();
    };
    Scene_QuestLog.prototype.createQuestDetailWindow = function() {
        const rect = this.questDetailWindowRect();
        this._questDetailWindow = new Window_QuestDetail(rect);
        this._questDetailWindow.contents.fontSize = detailFontSize;
        this.addWindow(this._questDetailWindow);
        this._questListWindow.setDetailWindow(this._questDetailWindow);
        // Met à jour immédiatement le panneau de détails en fonction de la sélection courante
        this._questListWindow.updateHelp();
    };
    Scene_QuestLog.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_QuestStatus(rect);
        this._statusWindow.contents.fontSize = statusFontSize;
        this.addWindow(this._statusWindow);
    };
    
    // --- DIMENSIONS DES FENÊTRES (Structure Liste à Gauche / Détails à Droite) ---
    Scene_QuestLog.prototype.questListWindowRect = function() {
        const ww = Graphics.boxWidth * 0.4; // 40% pour la liste (GAUCHE)
        const sh = this.statusWindowRect().height;
        const wh = Graphics.boxHeight - sh;
        return new Rectangle(0, 0, ww, wh); // En haut à gauche
    };
    Scene_QuestLog.prototype.questDetailWindowRect = function() {
        const x = this.questListWindowRect().width;
        const ww = Graphics.boxWidth - x; // 60% pour les détails (DROITE)
        const sh = this.statusWindowRect().height;
        const wh = Graphics.boxHeight - sh;
        return new Rectangle(x, 0, ww, wh); // En haut à droite
    };
    Scene_QuestLog.prototype.statusWindowRect = function() {
        const wh = this.calcWindowHeight(1, true); // Hauteur d'une ligne (sélectionnable pour garantir une hauteur non nulle)
        return new Rectangle(0, Graphics.boxHeight - wh, Graphics.boxWidth, wh); // En bas, toute la largeur
    };
    // --- FIN DIMENSIONS DES FENÊTRES ---
    
    Scene_QuestLog.prototype.nextType = function() {
        this._currentType = this._currentType === 'Principale' ? 'Secondaire' : 'Principale';
        this._questListWindow.setQuestType(this._currentType);
        this._questListWindow.activate();
    };
    Scene_QuestLog.prototype.prevType = function() {
        this.nextType();
        this._questListWindow.activate();
    };

    // --- Window_QuestList ---
    function Window_QuestList() { this.initialize(...arguments); }
    Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
    Window_QuestList.prototype.constructor = Window_QuestList;
    Window_QuestList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this._questType = 'Principale';
    };
    Window_QuestList.prototype.setQuestType = function(type) {
        if (this._questType !== type) {
            this._questType = type;
            this.refresh();
            this._questDetailWindow.setQuest(null);
        }
    };
    Window_QuestList.prototype.maxItems = function() { return this._data ? this._data.length : 1; };
    Window_QuestList.prototype.setDetailWindow = function(window) { this._questDetailWindow = window; this.updateHelp(); };
    Window_QuestList.prototype.updateHelp = function() {
        if (this._questDetailWindow) {
            const questId = this.item();
            const quest = questId ? $gameSystem.getQuestData(questId) : null;
            // synchronise la sélection globale pour le pointeur
            $gameSystem.setSelectedQuestId(questId || null);
            this._questDetailWindow.setQuest(quest);
        }
    };
    Window_QuestList.prototype.item = function() {
        const index = this.index();
        return this._data && index >= 0 ? this._data[index] : null;
    };
    // Met à jour le panneau de détails à chaque changement de sélection
    Window_QuestList.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this.active) this.updateHelp();
    };
    Window_QuestList.prototype.makeItemList = function() {
        // Ordre souhaité:
        // 1) Actives Principales
        // 2) Actives Secondaires
        // 3) --- Séparateur ---
        // 4) Terminées Principales
        // 5) Terminées Secondaires
        const activeMain = $gameSystem.getActiveQuests('Principale').slice();
        const activeSide = $gameSystem.getActiveQuests('Secondaire').slice();
        const completedMain = $gameSystem.getCompletedQuests('Principale').slice();
        const completedSide = $gameSystem.getCompletedQuests('Secondaire').slice();

        this._data = [].concat(activeMain, activeSide);

        const anyCompleted = completedMain.length > 0 || completedSide.length > 0;
        if (this._data.length > 0 && anyCompleted) this._data.push(null);

        this._data = this._data.concat(completedMain, completedSide);

        if (this._data.length === 0) this._data.push("NO_QUESTS");
    };
    Window_QuestList.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const questId = this._data[index];
        
        if (questId === "NO_QUESTS") {
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText("Aucune quête en cours ou terminée.", rect.x, rect.y, rect.width, 'center');
            this.changeTextColor(ColorManager.normalColor());
        } else if (questId === null) {
            this.drawText("--- Quêtes Terminées ---", rect.x, rect.y, rect.width, 'center');
        } else {
            const quest = $gameSystem.getQuestData(questId);
            const isCompleted = $gameSystem.isQuestCompleted(questId);
            // Couleur: grisée si terminée, normale sinon (fallback pour anciennes versions)
            const completedColor = (typeof ColorManager.textColor === 'function' ? ColorManager.textColor(completedQuestColorIndex) : '#808080');
            this.changeTextColor(isCompleted ? completedColor : ColorManager.normalColor());
            this.drawText(quest.name, rect.x, rect.y, rect.width);
        }
    };
    Window_QuestList.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
        
        if (this.maxItems() > 0) {
            this.select(0);
            // Assure la mise à jour immédiate du panneau de détails
            this.updateHelp();
        } else {
            this.deselect();
        }
    };
    
    // --- Window_QuestDetail ---
    function Window_QuestDetail() { this.initialize(...arguments); }
    Window_QuestDetail.prototype = Object.create(Window_Base.prototype);
    Window_QuestDetail.prototype.constructor = Window_QuestDetail;
    Window_QuestDetail.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._quest = null;
        this.refresh();
    };
    // Compat: certaines versions de MZ n'exposent pas textPadding();
    // on fournit une implémentation sûre qui s'appuie sur itemPadding si dispo.
    Window_QuestDetail.prototype.textPadding = function() {
        const p = this.itemPadding;
        if (typeof p === 'function') return p.call(this);
        if (typeof p === 'number') return p;
        if (typeof Window_Base.prototype.itemPadding === 'function') {
            return Window_Base.prototype.itemPadding.call(this);
        }
        if (typeof Window_Base.prototype.textPadding === 'function') {
            return Window_Base.prototype.textPadding.call(this);
        }
        return 12; // valeur par défaut raisonnable
    };
    Window_QuestDetail.prototype.setQuest = function(quest) {
        if (this._quest !== quest) {
            this._quest = quest;
            this.refresh();
        }
    };
    // Retourne un tableau de lignes en respectant la largeur disponible
    Window_QuestDetail.prototype.wrapText = function(text, maxWidth) {
        const lines = [];
        const words = (text || '').split(/\s+/);
        let current = '';
        const space = ' ';
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const tentative = current ? current + space + word : word;
            if (this.textWidth(tentative) <= maxWidth) {
                current = tentative;
                continue;
            }
            if (current) lines.push(current);
            // Si un mot est trop long, on le découpe par caractères
            if (this.textWidth(word) > maxWidth) {
                let chunk = '';
                for (const ch of word.split('')) {
                    const next = chunk + ch;
                    if (this.textWidth(next) > maxWidth) {
                        if (chunk) lines.push(chunk);
                        chunk = ch;
                    } else {
                        chunk = next;
                    }
                }
                current = chunk;
            } else {
                current = word;
            }
        }
        if (current) lines.push(current);
        return lines;
    };
    Window_QuestDetail.prototype.refresh = function() {
        this.contents.clear();
        if (this._quest && this._quest !== "NO_QUESTS") {
            const isCompleted = $gameSystem.isQuestCompleted(this._quest.id);
            const statusColor = isCompleted ? 3 : 2;
            const statusText = isCompleted ? "TERMINÉE" : "EN COURS";
            const lineHeight = this.lineHeight();

            // Titre (wrap si trop long)
            this.changeTextColor(ColorManager.textColor(detailTitleColorIndex));
            const availableWidth = this.contents.width - this.textPadding() * 2;
            const nameLines = this.wrapText(String(this._quest.name), availableWidth);
            let y = 0;
            for (const part of nameLines) {
                this.drawText(part, this.textPadding(), y, availableWidth);
                y += lineHeight;
            }
            this.changeTextColor(ColorManager.textColor(detailTextColorIndex));

            // Statut (sans codes d'échappement)
            this.drawText(`${labelStatus} ${statusText}`, 0, y, this.contents.width);
            y += Math.floor(lineHeight * 1.5);

            // Description (avec retour à la ligne automatique)
            this.drawText(labelObjectives, 0, y);
            const descriptionLines = this._quest.description.split('\n');
            y += lineHeight;
            for (const originalLine of descriptionLines) {
                const wrapped = this.wrapText(originalLine, availableWidth);
                for (const part of wrapped) {
                    this.drawText(part, this.textPadding(), y, availableWidth);
                    y += lineHeight;
                }
            }
            
            // Récompenses
            y += Math.floor(lineHeight * 1.5);
            this.drawText(labelRewards, 0, y);
            y += lineHeight;
            
            let rewards = [`Or: ${this._quest.goldReward}`];
            const itemId = Number(this._quest.itemReward);
            if (itemId > 0) rewards.push(`${$dataItems[itemId].name}`);
            const actorId = Number(this._quest.actorReward);
            if (actorId > 0) rewards.push(`${$dataActors[actorId].name} (Personnage)`);
            
            const rewardJoined = rewards.join(', ');
            const rewardLines = this.wrapText(rewardJoined, availableWidth);
            for (const part of rewardLines) {
                this.drawText(part, this.textPadding(), y, availableWidth);
                y += lineHeight;
            }
        } else {
             this.drawText("Sélectionnez une quête.", 0, 0, this.contents.width, 'center');
        }
    };
    
    // --- Window_QuestStatus ---
    function Window_QuestStatus() { this.initialize(...arguments); }
    Window_QuestStatus.prototype = Object.create(Window_Base.prototype);
    Window_QuestStatus.prototype.constructor = Window_QuestStatus;
    Window_QuestStatus.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };
    Window_QuestStatus.prototype.refresh = function() {
        this.contents.clear();
        const mainCount = $gameSystem.getActiveQuests('Principale').length; 
        const sideCount = $gameSystem.getActiveQuests('Secondaire').length;
        const text = `Quêtes Actives : \\C[2]${mainCount} Principales\\C[0] / \\C[2]${sideCount} Secondaires\\C[0]`;
        this.drawTextEx(text, 0, 0, this.contents.width);
    };

    // GESTION DE LA COMPATIBILITÉ ET DE L'APPEL DE LA SCÈNE
    
    Scene_Menu.prototype.commandQuest = function() {
        SceneManager.push(Scene_QuestLog); 
    };

    // --- LOGIQUE D'AJOUT DANS LE MENU (AVEC CONTRÔLE PAR INTERRUPTEUR) ---
    if (showInMenu) {
        const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function() {
            _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
            
            let shouldAdd = true;
            if (menuSwitchId > 0) {
                shouldAdd = $gameSwitches.value(menuSwitchId);
            }

            if (shouldAdd) {
                this.addCommand(menuCommandName, 'questlog', true); 
            }
        };
        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler('questlog', this.commandQuest.bind(this));
        };
    }
    
    // --- PATCH DE COMPATIBILITÉ CRITIQUE POUR VisuMZ ---
    if (typeof Imported !== 'undefined' && Imported.VisuMZ_1_MainMenuCore) {
        const _Scene_Menu_createCommandWindow_VisuMZ_Patch = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow_VisuMZ_Patch.apply(this, arguments);
            if (this._commandWindow && !this._commandWindow.isHandled('questlog')) {
                this._commandWindow.setHandler('questlog', this.commandQuest.bind(this));
            }
        };
    }
    // Fin du patch de compatibilité

    // --- Option In-Game (Window_Options) pour (dés)activer le panneau gauche ---
    if (false) {
        const _Window_Options_makeCommandList_QSM = Window_Options.prototype.makeCommandList;
        Window_Options.prototype.makeCommandList = function() {
            _Window_Options_makeCommandList_QSM.apply(this, arguments);
            if (allowOptionsToggle) this.addCommand(optionsToggleName, 'questLeftPanel');
            if (allowPanelConfigSubmenu) this.addCommand(panelConfigCommandName, 'questPanelConfig');
        };
        const _Window_Options_getConfigValue_QSM = Window_Options.prototype.getConfigValue;
        Window_Options.prototype.getConfigValue = function(symbol) {
            if (symbol === 'questLeftPanel') return ConfigManager.questLeftPanel;
            return _Window_Options_getConfigValue_QSM.apply(this, arguments);
        };
        const _Window_Options_setConfigValue_QSM = Window_Options.prototype.setConfigValue;
        Window_Options.prototype.setConfigValue = function(symbol, value) {
            if (symbol === 'questLeftPanel') {
                ConfigManager.questLeftPanel = !!value;
                // Rafraîchit la fenêtre sur la carte si présente
                if (SceneManager._scene && SceneManager._scene._questSidebarWindow) {
                    const win = SceneManager._scene._questSidebarWindow;
                    win.visible = ConfigManager.questLeftPanel;
                    win.requestRefresh();
                }
                return;
            }
            _Window_Options_setConfigValue_QSM.apply(this, arguments);
        };
        // Gestion du sous-menu: ouvrir la scène de configuration
        const _Window_Options_processOk_QSM = Window_Options.prototype.processOk;
        Window_Options.prototype.processOk = function() {
            const symbol = this.commandSymbol(this.index());
            if (symbol === 'questPanelConfig') {
                Window_Selectable.prototype.processOk.call(this);
                SceneManager.push(Scene_QuestPanelOptions);
                return;
            }
            _Window_Options_processOk_QSM.apply(this, arguments);
        };
    }

    // --- Panneau latéral gauche des quêtes (Scene_Map) ---
    // Panneau latéral retiré: définitions neutralisées
    function Window_QuestSidebar() { this.initialize(...arguments); }
    Window_QuestSidebar.prototype = Object.create(Window_Base.prototype);
    Window_QuestSidebar.prototype.constructor = Window_QuestSidebar;
    Window_QuestSidebar.prototype.initialize = function(rect) { Window_Base.prototype.initialize.call(this, rect); this.visible = false; };
    // Compat: certaines versions n'exposent pas textPadding() correctement
    Window_QuestSidebar.prototype.textPadding = function() {
        const p = this.itemPadding;
        if (typeof p === 'function') return p.call(this);
        if (typeof p === 'number') return p;
        if (typeof Window_Base.prototype.itemPadding === 'function') {
            return Window_Base.prototype.itemPadding.call(this);
        }
        if (typeof Window_Base.prototype.textPadding === 'function') {
            return Window_Base.prototype.textPadding.call(this);
        }
        return 12;
    };
    Window_QuestSidebar.prototype.requestRefresh = function() { this._needsRefresh = true; };
    Window_QuestSidebar.prototype.makeSnapshotKey = function() {
        const activeMain = ($gameSystem.getActiveQuests('Principale') || []).join('|');
        const activeSide = ($gameSystem.getActiveQuests('Secondaire') || []).join('|');
        return `${activeMain}__${activeSide}`;
    };
    Window_QuestSidebar.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        const key = this.makeSnapshotKey();
        if (key !== this._lastSnapshot) {
            this._lastSnapshot = key;
            this._needsRefresh = true;
        }
        if (this._needsRefresh) this.refresh();
    };
    Window_QuestSidebar.prototype.refresh = function() {
        this._needsRefresh = false;
        this.contents.clear();
        const lineHeight = this.lineHeight();
        let y = 0;
        // Titre
        this.changeTextColor(ColorManager.textColor(sidebarTitleColorIndex));
        this.drawText(String(sidebarTitle), 0, y, this.contents.width);
        this.changeTextColor(ColorManager.textColor(sidebarTextColorIndex));
        y += Math.floor(lineHeight * 1.25);

        const drawQuestList = (label, list) => {
            if (!list || list.length === 0) return 0;
            let used = 0;
            this.changeTextColor(ColorManager.textColor(sidebarSystemColorIndex));
            this.drawText(label, 0, y + used, this.contents.width);
            used += lineHeight;
            this.changeTextColor(ColorManager.textColor(sidebarTextColorIndex));
            for (const questId of list) {
                const quest = $gameSystem.getQuestData(questId);
                if (!quest) continue;
                const name = String(quest.name);
                const maxWidth = this.contents.width - this.textPadding() * 2;
                // Wrap basique sur 2 lignes max
                const words = name.split(/\s+/);
                let current = '';
                let lines = [];
                for (const w of words) {
                    const candidate = current ? current + ' ' + w : w;
                    if (this.textWidth(candidate) <= maxWidth) current = candidate; else { lines.push(current); current = w; }
                    if (lines.length >= 2) break;
                }
                if (current && lines.length < 2) lines.push(current);
                for (const ln of lines) {
                    this.drawText(ln, this.textPadding(), y + used, this.contents.width - this.textPadding() * 2);
                    used += lineHeight;
                }
                used += Math.floor(lineHeight * 0.25);
            }
            used += Math.floor(lineHeight * 0.5);
            return used;
        };

        y += drawQuestList('Principales', $gameSystem.getActiveQuests('Principale'));
        y += drawQuestList('Secondaires', $gameSystem.getActiveQuests('Secondaire'));

        if (y === Math.floor(lineHeight * 1.25)) {
            this.changeTextColor(ColorManager.crisisColor());
            this.drawText('Aucune quête active', 0, y, this.contents.width, 'left');
            this.changeTextColor(ColorManager.textColor(sidebarTextColorIndex));
        }
    };

    Scene_Map.prototype.questSidebarWindowRect = function() {
        const w = Math.max(120, Math.min(640, Number(ConfigManager.questPanelWidth || leftPanelWidth)));
        const hRaw = Number(ConfigManager.questPanelHeight || 0);
        const h = hRaw > 0 ? Math.min(Graphics.boxHeight, hRaw) : Graphics.boxHeight;
        const x = (ConfigManager.questPanelSide === 'right') ? (Graphics.boxWidth - w) : 0;
        const y = 0;
        return new Rectangle(x, y, w, h);
    };
    const _Scene_Map_createAllWindows_QSM = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows_QSM.apply(this, arguments);
        // panneau désactivé définitivement
    };

    // Raccourci pour ouvrir le Journal de Quêtes
    const _Scene_Map_updateCallMenu_QSM = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_updateCallMenu_QSM.apply(this, arguments);
        if (questLogHotkey && questLogHotkey !== 'None' && SceneManager._scene === this && this.isActive() && !SceneManager.isSceneChanging()) {
            const symbol = questLogHotkey.toLowerCase();
            // Support clavier et manette (ex: bouton "ok")
            const hotkeyTriggered = Input.isTriggered(symbol) || Input.isTriggered('ok') && symbol === 'enter';
            if (hotkeyTriggered) {
                SceneManager.push(Scene_QuestLog);
            }
        }
    };

    // Permet de repositionner/redimensionner la fenêtre lors de changements en live
    Scene_Map.prototype.updateQuestSidebarLayout = function() {
        if (!this._questSidebarWindow) return;
        const rect = this.questSidebarWindowRect();
        this._questSidebarWindow.move(rect.x, rect.y, rect.width, rect.height);
        this._questSidebarWindow.requestRefresh();
    };

    // --- Scène de configuration du panneau ---
    function Scene_QuestPanelOptions() { this.initialize(...arguments); }
    Scene_QuestPanelOptions.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_QuestPanelOptions.prototype.constructor = Scene_QuestPanelOptions;
    Scene_QuestPanelOptions.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._configWindow = new Window_QuestPanelOptions(rect);
        this._configWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._configWindow);
    };

    function Window_QuestPanelOptions() { this.initialize(...arguments); }
    Window_QuestPanelOptions.prototype = Object.create(Window_Command.prototype);
    Window_QuestPanelOptions.prototype.constructor = Window_QuestPanelOptions;
    Window_QuestPanelOptions.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.select(0);
        this.activate();
    };
    Window_QuestPanelOptions.prototype.windowWidth = function() { return Graphics.boxWidth; };
    Window_QuestPanelOptions.prototype.windowHeight = function() { return Graphics.boxHeight; };
    Window_QuestPanelOptions.prototype.makeCommandList = function() {
        this.addCommand('Côté', 'side');
        this.addCommand('Largeur', 'width');
        this.addCommand('Hauteur', 'height');
    };
    Window_QuestPanelOptions.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const symbol = this.commandSymbol(index);
        let value = '';
        if (symbol === 'side') value = (ConfigManager.questPanelSide === 'right') ? 'Droite' : 'Gauche';
        if (symbol === 'width') value = String(ConfigManager.questPanelWidth);
        if (symbol === 'height') value = ConfigManager.questPanelHeight > 0 ? String(ConfigManager.questPanelHeight) : 'Auto';
        this.resetTextColor();
        const name = this.commandName(index);
        this.drawText(name, rect.x, rect.y, rect.width / 2);
        this.drawText(value, rect.x + rect.width / 2, rect.y, rect.width / 2, 'right');
    };
    Window_QuestPanelOptions.prototype.cursorRight = function(wrap) {
        Window_Command.prototype.cursorRight.call(this, wrap);
        this.changeValue(+1);
    };
    Window_QuestPanelOptions.prototype.cursorLeft = function(wrap) {
        Window_Command.prototype.cursorLeft.call(this, wrap);
        this.changeValue(-1);
    };
    Window_QuestPanelOptions.prototype.processOk = function() {
        Window_Command.prototype.processOk.call(this);
        this.changeValue(+1);
    };
    Window_QuestPanelOptions.prototype.changeValue = function(delta) {
        const symbol = this.commandSymbol(this.index());
        const step = 10;
        if (symbol === 'side') {
            ConfigManager.questPanelSide = (ConfigManager.questPanelSide === 'right') ? 'left' : 'right';
        } else if (symbol === 'width') {
            let w = Number(ConfigManager.questPanelWidth || leftPanelWidth);
            w = Math.max(120, Math.min(640, w + (delta > 0 ? step : -step)));
            ConfigManager.questPanelWidth = w;
        } else if (symbol === 'height') {
            let h = Number(ConfigManager.questPanelHeight || 0);
            if (h <= 0) h = Graphics.boxHeight; // treat Auto as current height for stepping
            h = Math.max(0, Math.min(1080, h + (delta > 0 ? step : -step)));
            // Toggle Auto when crossing below a threshold
            if (h < 100) h = 0; // 0 = Auto
            ConfigManager.questPanelHeight = h;
        }
        this.redrawCurrentItem();
        // Appliquer en live si on est sur la carte
        if (SceneManager._scene && SceneManager._scene.updateQuestSidebarLayout) {
            SceneManager._scene.updateQuestSidebarLayout();
        }
    };

    class Sprite_QuestPointer extends Sprite {
        initialize() {
            super.initialize();
            this.anchor.set(0.5, 1.0);
            this.z = 9;
            this._pulse = 0;
            this._baseOpacity = 255;
            this._color = pointerColor;
            this.createGraphics();
            this.visible = false;
        }
        createGraphics() {
            const r = 16;
            
            // Créer un Graphics PIXI directement
            const graphics = new PIXI.Graphics();
            const col = this._color;
            const c = PIXI.utils.string2hex(col);
            
            // Dessiner le cercle principal
            graphics.beginFill(c, 0.95);
            graphics.drawCircle(0, 0, r);
            graphics.endFill();
            
            // Dessiner le point lumineux
            graphics.beginFill(0xffffff, 0.35);
            graphics.drawCircle(-6, -6, 6);
            graphics.endFill();
            
            // Créer un bitmap à partir du graphics
            const size = r * 4;
            this.bitmap = new Bitmap(size, size);
            
            // Dessiner sur le bitmap
            const context = this.bitmap._context;
            if (context) {
                context.save();
                context.globalAlpha = 0.95;
                context.fillStyle = col;
                context.beginPath();
                context.arc(size / 2, size / 2, r, 0, Math.PI * 2);
                context.fill();
                
                context.globalAlpha = 0.35;
                context.fillStyle = '#ffffff';
                context.beginPath();
                context.arc(size / 2 - 6, size / 2 - 6, 6, 0, Math.PI * 2);
                context.fill();
                context.restore();
            }
            
            this._baseOpacity = pointerOpacity;
            this.opacity = this._baseOpacity;
            this.blendMode = PIXI.BLEND_MODES.ADD;
        }
        setStyle(color, opacity) {
            this._color = color || pointerColor;
            this._baseOpacity = typeof opacity === 'number' ? opacity : pointerOpacity;
            this.createGraphics();
        }
        update() {
            super.update();
            try {
                const target = $gameSystem.getQuestTarget();
                if (target && target.mapId === $gameMap.mapId()) {
                    if (!this.visible) this.visible = true;
                    const tx = $gameMap.tileWidth() * (target.x + 0.5);
                    const ty = $gameMap.tileHeight() * (target.y + 1.0);
                    this.x = Math.round(tx);
                    this.y = Math.round(ty);
                    // Pulse
                    this._pulse += 0.05;
                    const p = (Math.sin(this._pulse) + 1) * 0.5; // 0..1
                    this.scale.set(0.9 + 0.15 * p);
                    const styleOpacity = typeof target.opacity === 'number' ? target.opacity : this._baseOpacity;
                    this.opacity = Math.round(styleOpacity * (0.85 + 0.15 * p));
                    const col = target.color || this._color;
                    if (col !== this._color) this.setStyle(col, styleOpacity);
                } else {
                    this.visible = false;
                }
            } catch (e) {
                console.warn("Erreur dans l'update du pointeur de quête:", e);
                this.visible = false;
            }
        }
    }

    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.apply(this, arguments);
        if (questPointerEnabled) {
            try {
                this.createQuestPointer();
            } catch (e) {
                console.warn("Erreur lors de la création du pointeur de quête:", e);
                // Désactiver le pointeur en cas d'erreur
                questPointerEnabled = false;
            }
        }
    };
    Spriteset_Map.prototype.createQuestPointer = function() {
        if (this._questPointerSprite) return;
        try {
            this._questPointerSprite = new Sprite_QuestPointer();
            this._tilemap.addChild(this._questPointerSprite);
        } catch (e) {
            console.warn("Impossible de créer le sprite de pointeur de quête:", e);
            this._questPointerSprite = null;
        }
    };
//    
//    
    // --- Enregistrement des Commandes de Plugin ---
    
    PluginManager.registerCommand(pluginName, "start", args => {
        // Le message est maintenant géré par la fonction startQuest
        $gameSystem.startQuest(args.questId);
    });

    PluginManager.registerCommand(pluginName, "complete", args => {
        // Le message est maintenant géré par la fonction completeQuest
        $gameSystem.completeQuest(args.questId);
    });
    
    PluginManager.registerCommand(pluginName, "setTarget", args => {
        if (!questPointerEnabled) return;
        const mapId = Number(args.mapId || $gameMap.mapId());
        const x = Number(args.targetX || 0);
        const y = Number(args.targetY || 0);
        const name = String(args.targetName || "Objectif de Quête");
        $gameSystem._currentQuestTarget = { mapId: mapId, x: x, y: y, name: name, questId: $gameSystem._currentQuestTarget ? $gameSystem._currentQuestTarget.questId : null };
    });

    PluginManager.registerCommand(pluginName, "clearTarget", args => {
        if (!questPointerEnabled) return;
        $gameSystem._currentQuestTarget = null;
    });

    PluginManager.registerCommand(pluginName, "checkAndAdvance", args => {
        const questId = args.questId;
        const itemId = Number(args.itemId);
        const quantity = Number(args.quantity || 1);
        const remove = args.remove === 'true';
        const isFinal = args.isFinal === 'true';

        if (!$gameSystem.isQuestActive(questId)) return;
        
        const item = $dataItems[itemId];
        if (!$gameParty.hasItem(item, quantity)) {
            if ($gameMessage) $gameMessage.add(`Je n'ai pas encore tout ce dont j'ai besoin.`);
            return;
        }

        if (remove) $gameParty.loseItem(item, quantity);

        if (isFinal) {
            $gameSystem.completeQuest(questId); // Message de complétion affiché ici
        } else {
            const quest = $gameSystem.getQuestData(questId);
            const nextQuestId = quest.nextQuestId.trim();
            
            if (nextQuestId) {
                // Termine l'étape actuelle sans message (car ce n'est qu'une étape)
                $gameSystem._activeQuests.main = $gameSystem._activeQuests.main.filter(id => id !== questId);
                $gameSystem._activeQuests.side = $gameSystem._activeQuests.side.filter(id => id !== questId);
                
                // Démarre la quête suivante avec message
                $gameSystem.startQuest(nextQuestId);
            }
        }
    });

})();