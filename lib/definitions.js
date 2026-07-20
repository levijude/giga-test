// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        } 
    });
    return {  
        reload:     data[0], 
        recoil:     data[1],   
        shudder:    data[2],// fuck u redstripe 
      //love you too bae  
        size:       data[3], 
        health:     data[4],  
        damage:     data[5],
        pen:        data[6], 
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9], 
        density:    data[10], 
        spray:      data[11],
        resist:     data[12],
    }; 
    } catch(err) { 
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;    
    }; 
})(); 
   
const g = { // Gun info here  
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   3,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],
    gigatest:           [20,    1.4,   0.1,    1,      1,      1.5,    0.8,    5.5,    1,      1,      1,      15,     1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    shock:              [10,    1,     1,      4,      100,    1,      1,      0,      1,      0.1,    1,      1,      2],
    swarmbuff1:         [0.9,   1,     1,      0.85,   1,      1.75,   0.3,    2.25,   1,      1.3,    1,      2,      1],
    swarmbuff2:         [2,     1,     1,      0.85,   1,      2,      0.2,    3,      1,      1,      1,      2.5,    1],
    follower:           [0.5,   0,     1,      2,      1,      0,      1,      0.5,    1,      0.1,    1,      100,    1],
    follower1:          [20,    0,     1,      1,      1,      1,      1,      2,      1,      1,      1,      1,      1],
    sex:                [0.5,   3,     1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1.3,    1],
    sex1:               [30,    0,     1,      1,      1,      1,      1,      3,      1,      1,      1,      1,      1],
    big:                [1,     1,     1,      1.5,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    upcoming:           [1e100, 1,     1,      1.75,   1,      1,      1,      3,      1,      1,      1,      1,      1],
    front36:            [0.3,   1,     1,      1,      0.1,    0.1,    0.1,    0.5,    1,      25,     1,      2,      1],
    eyedrone:           [0.3,   0,     1,      1,      1,      1.3,    0.5,    0.2,    1,      2,      1,      3,      1],
    wrath:              [1e100, 5,     1,      100000, 1e100,  0,      1,      0,      0,      0.25,   1,      0.001,     1],
    warn:               [12,    0,     1,      1,      0.001,  1,      1,      3,      1,      1,      1,      1,      1],
    ab02:               [12,    25,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    warn3:              [15,    0,     1,      1,      0.001,  1,      1,      3,      1,      1,      1,      1,      1],
    ab03:               [15,    35,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    warn4:              [20,    0,     1,      1,      1,      1,      1,      4,      1,      1,     1,      1,      1],
    ab04:               [20,    48,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    ab04_2:             [20,    48,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    warn5:              [24,    0,     1,      0.8,    1,      1.3,    0.1,    4,      1,      1,      1,      1,      1],
    ab05:               [24,    40,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    warn5_2:            [48,    0,     1,      0.6,    1,      1.8,    0.1,    5,      1,      1,      1,      1,      1],
    ab05_2_:            [48,    70,    1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1],
    ab05_2:             [48,    120,   1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1],
    crasg:              [2,     1,     1,      10,     1e300, 1e300, 1e300, 3,      3,      1e300, 1e300, 50,     1e300],
    crasg2:             [2,     1,     1,      7,     1e300, 1e300, 1e300, 3,      3,      1e300, 1e300, 50,     1e300],
   crasg3:              [2,     1,     1,      5,     1e300, 1e300, 1e300, 3,      3,      1e300, 1e300, 50,     1e300],
  cras4:                [2,     1,     1,      3.1415926535979323846264,     1e300, 1e300, 1e300, 3,      3,      1e300, 1e300, 50,     1e300],
    small:              [1,     1,     1,      0.6,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    c14:                [6,     5,     1,      1,      1,      1,      0.1,    1,      1,      1,      1,      2,      1.5],
    c14_1:              [6,     2,     1,      0,      0,      0,      1,      0,      1,      0.001,  1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    aaaaa:              [1.4,   1,     1,      1,      1,      1.2,    1,      1.3,    1.2,    1,      1,      1,      1],
    aaaab:              [20,    1,     1,      2,      1000,   0.01,   50,     1,      1,      2,      1,      1,      10],
    aaaac:              [35,    1,     1,      1,      1000,   1000,   1000,   20,     20,     1000,   1000,   0.0001, 1000],
    aaaad:              [1.4,   0,     1,      1,      1.5,    1,      2.6,    1.2,    1,      1,      1,      1.15,   1.05],
    aaaae:              [0.8,   1,     1,      1,      1,      1.8,    0.6,    1.3,    1.25,   1.5,    1,      360,    1],
    aaaaf:              [0.1,   1,     1,      1,      1,      1.5,    1,      0.8,    1,      1.5,    1,      2.5,    1],
    aaaag:              [0.8,   0.2,   1,      1.1,    2,      3,      10,     1.2,    1.2,    1,      1.5,    1.01,   1.1],
    aaaah:              [0.2,   4,     1,      0.5,    1,      1.5,    5,      1.5,    1.5,    1.5,    1,      1,      1],
    aaaai:              [1.4,   1.2,   1,      1.1,    1.7,    2,      2.5,    1,      1.5,    1.5,    1.8,    1,      1],
    aaaaj:              [1.1,   1.1,   1,      1.5,    1,      1,      1,      1.3,    2,      1.5,    0.9,    1.1,    1],
    aaaak:              [1,     1,     1,      1,      1,      15,     1,      3,      1,      1,      1,      1,      1],
    aaaal:              [1.3,   3,     1,      1,      1,      1,      0.8,    1,      1,      1,      1,      2,      1],
    aaaam:              [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    aaaan:              [4,     1,     1,      3,      5,      1,      1,      3.5,    1,      3,      1,      1,      1],
    aaaao:              [1,     6,     1,      3,      1,      0,      1,      0,      1,      0.1,    1,      1,      1],
    aaaap:              [0.9,   1,     1,      1,      1,      1,      1,      1.75,   1.75,   1,      1,      1,      1],
    aaaaq:              [1.4,   1,     1,      1,      0.8,    1.3,    0.8,    1.4,    1,      1,      1.3,    0.1,    1.1],
    lilspray:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      2,      1],
    faster:             [1,     1,     1,      1,      1,      1,      1,      2,      1,      1,      1,      1,      1], 
    weaker:             [1.5,   1,     1,      1,      0.5,    0.3,    0.5,    1,      1,      0.5,    1,      1.5,     1],
    nospray:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      0.0001,    1],
    fullspray:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      360, 1],
    healing:            [1,     1,     1,      1,      1,      -2,     1,      1,      1,      1,      1,      1,      1],
    boombaby:           [1,     -5,    1,      1.5,    1,      0.001,  0,      3,      3,      10,     1000,   1,      100],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],
        rifle2:         [1,     0.8,   1.5,    1,      1.2,    1,      0.1,    1.5,    1,      1,      1,      2,      1.05],
        rcannon:        [35,    1,     1.5,    1,      2,      0.8,    0.9,    3.5,    1,      1,      1,      0.5,    1],
        strike:         [1,     1,     1.5,    2,      100,    1.7,    1.7,    0,      1,      1.5,    1,      0.5,    1],
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        ranger:         [1.2,   1,     0.25,   0.9,    1.5,    1.2,    1.5,    2,      1,      1,      1,      1,      1.1],
        knockb:         [1.3,   1,     0.25,   1,      1.4,    1.2,    0.05,   3,      2.5,    1.4,    100,    0.01,   23],
        knockb7:        [0.8,   1,     0.25,   1,      1,      0.7,    0.05,   1,      1,      1,      10,     0.01,   2],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [13,    1,     1,      0.8,    1.5,    1.4,    1.2,    1.3,    1.5,    1,      1,      1,      1.2],
            malpreda:   [0.6,   -1.5,  1,      1.1,    1.5,    1.5,    0.7,    4,      1.5,    1,      1.5,    1.5,    1.5], /*1.4*/
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
    machbuff:           [0.5,   0.8,   1.7,    1,      0.75,   1,      1,      1.5,    1,      0.8,    1,      5,      0.975],
    extramach:          [1,     0.8,   1,      1.5,    1.1,    1,      1.1,    1,      1,      1,      1,      1,      1],
    flame:              [0.9,   0.9,   1.2,    0.8,    0.8,    0.75,   1,      0.8,    0.8,    0.45,   1,      1.3,    1], 
    blast:              [0.8,   0.9,   1.1,    0.9,    0.9,    1,      1,      1.05,   1,      0.95,   1,      1.1,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
    minin:              [2,     0.6,   1,      0.8,    1,      1.2,    1.55,   1.33,   1.5,    1,      1.05,   0.00001, 1.1], 
            stream:     [1.1,   0.6,   1,      1,      0.9,    0.95,   40,     2,      1,      0.3,    2,      1,      1],    
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
        attack:         [2,     0.75,  0.5,    0.9,    0.7,    0.4,    1.1,    1.2,    1.1,    0.7,    1.25,   1,      1.2],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1.5,    1,      1,      1,      1,      1,      1,      1,      1],
            thrus:      [1.1,   0.95,  1,      1,      0.8,    0.9,    0.9,    0.9,    1,      1,      1,      1,      1],
            decim:      [1.2,   1.25,  1,      1.32,   1.2,    1.1,    1.5,    1,      1,      1.05,   1.2,    1,      1],
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        churn:          [1.6,   0.8,   0.9,    1,      0.8,    0.7,    0.9,    1,      1,      1,      1,      0.0001, 1],
        pack:           [1.5,   1,     1,      1,      1,      1,      0.9,    0.9,    0.9,    1,      1,      0.0001, 1.5],
        whip:           [1.2,   1,     1,      1,      0.9,    0.9,    0.9,    1.2,    1.2,    1,      1,      0.0001, 1],
        bent:           [1,     1,     0.8,    1,      1.5,    1,      1.5,    1.2,    1,      1,      0.8,    0.5,    1.2],    
        triple:         [1.4,   0.5,   0.9,    1.3,    1.5,    1.5,    1.5,    1.5,    1,      1.5,      1.5,    0.1,    1], 
        twiple:         [0.8,   0.667,    0.9,    4,      0.85,   1.5,    0.4,    1,      1,      1,      1.2,    1.3,    1],
        twiple2:        [0.6,   0.667,    0.9,    2,      0.5,   1.5,    0.2,    1,      1,      1,      1.2,    1.3,    0.9],
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
        puregunneA:     [1.3,   6,     1.5,    1.2,    1,      1.5,    2,      0.5,    0.65,   1.5,    1.5,    3.5,    1.2],
        puregunneB:     [2,     2,     1.5,    1.2,    5,      1.2,    0.08,   2.5,    2.5,    1,      1.5,    1,      1.2],
        puregunneC:     [0.7,   3,     1,      1,      2,      1.5,    1.25,   1,      1,      5,      1.5,    1.5,    1],
        puregunneD:     [1,     1,     1.5,    1.2,    0.8,    2.75,   0.5,    1.5,    1.3,    0.6,    1.5,    2.5,    1.5],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
    better4:            [1.25,  0,     1.5,    1,      1,      0.8,    0.2,    2.3,    1,      1.2,    1.6,    1,      1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
        ghij:           [1,     1,     1,      1,      2,      1,      10,     30,     1,      1,      1,      1,      1], 
        klmn:           [5,     -15,   1,      6,      4,      2,      10,     0,      1,      0.07,   1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    1,      1,      1,      1,      1,      0.5,    1,      1.05], 
    buff:               [0.9,   0.8,   1,      1,      1.4,    1.75,   1.8,    1.3,    1.5,    1,      2,      0.5,    1.1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],
    octotrap:           [0.9,   1,     1.25,   1.2,    3,      1.5,    0.025,  1.6,    1,      0.8,    1,      0.001,  1],
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
    over2:              [1.25,  1,     1,      0.8,    1.5,    0.8,    0.5,     1.5,   1,      1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],
  squareboss:         [0.35,  1,     1,     0.65,   1.3,    1.15,      1,      1,      1,      1,      1,      1,      1],
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    zerorecoil:         [1,     0,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    triplerecoil:       [1,     3,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    badreloadfr:        [12,    1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    ccknockback:        [1,     0.5,   1,      1,      1,      0.8,    0.5,    2,      2,      1,      3,      0.1,    2],
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1],  
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    morespray:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      2,      1],
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    fucktonofrange:     [1,     1,     1,      1,      1,      1,      1,      1,      1,      30943,  1,      1,      1],
    gnuuer:             [0.25,  0.2,   1,      1,      1,      1.5,    2,      1,      1,      30,     1.2,    1.2,    1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    crazy:              [0.5,   1,     1,      1.3,    1,      0.7,    1,      2,      1.5,    1,      1,      10,      1],
    egg:                [15,    1,     1,      1,      0.7,   0.3,     2.5,    1,      1,      0.5,    1,      3,      0.9],
    smol:               [1,     1,     1,      0.8,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    verysmol:           [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    extremsmol:         [1,     1,     1,      0.1,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    larg:               [1,     1,     1,      1.3,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    allaroundnerf:      [1.25,  1,     1,      1,      0.9,    0.7,    0.7,    1.2,    0.8,    1,      1,      1.05,   1],
    smallbuff:          [1.05,  1,     1,      1,      1.1,    1.25,   1.1,    1,      1.1,    1,      1,      1,      1],
    nospeed:            [1,     1,     1,      1,      1,      1,      1,      0,      1,      1,      1,      1,      1],
    swarmbuff:          [1.1,   1,     1,      1,      1.3,    2,      1.3,    1,      1,      1,      1,      1,      1],
    swarm14:            [10,    0,     1,      2,      1,      2,      0.5,    3.5,    1,      1,      1,      0.1,    1],
    fullspray:          [0.25,  1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      360,    1],
    halfpower:          [1,     1,     1,      1,      1,      0.5,    1,      1,      1,      1,      1,      1,      1],
    B:                  [1,     6,      1,      2,      1,      2,      2,      0.5,     1,      20,      1,       3,      1],
    SG:                 [3.75,    1.7,   1,       1.4,    2.15, 2.75,    4.5,    1.5,    1.5,    1.5,    1.9,    2,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],
    META:               [0.6,   1,     1,      1,      25,     3,      1,      4.5,    5,      10,     30,     0.01,   9],
    shghgjkssfgdfgs:    [1,     2,     1,      1.2,    1,      1,      1,      0.9,    1,      1,      1,      0.01,   1], 
    uiwhudjdmjdjfng:    [1.34,  -10,   1,      1.2,    2,      2,      0.1,    -3,     1,      1,      1,      3,      1.5], 
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
};

const dfltskl = 9; 

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6, 
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};
exports.absolutelyFUCKINGNOTHING = {
    NAME: '',
    LABEL: '',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 0,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 0,
        SPEED: 0,
        HEALTH: 0,
        RESIST: 0,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 0,
        PENETRATION: 0,

        RANGE: 0,
        FOV: 0,
        DENSITY: 0,
        STEALTH: 0,
        PUSHABILITY: 0,        
        HETERO: 0,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    DANGER: 1,
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.hexagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Hexagon',
    VALUE: 1150,
    SHAPE: 6,
    SIZE: 25,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};

exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.skwer = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'buff ass square',
    VALUE: 300000,
    SHAPE: 4,
    SIZE: 100,
    COLOR: 13,
    BODY: {
        DAMAGE: 20 * basePolygonDamage,
        DENSITY: 300,
        HEALTH: 1200 * basePolygonHealth,
        RESIST: Math.pow(2, 2),
        SHIELD: 200 * basePolygonHealth,
        REGEN: 0.5,
    },
    SPEED: 0,
    ACCELERATION: 0,
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 1,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true, 
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true, 
}; 
exports.wrath = {
    LABEL: '',
    TYPE: '27', 
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1,
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 0 * wepDamageFactor,
        PUSHABILITY: 0,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.lightningcyan = {
    LABEL: '',
    COLOR: 197,
    SHAPE: [[-1,0],[-0.2,0.2],[0.1,-0.4],[1,0],[0.2,-0.2],[0,0.4]],
    INDEPENDENT: false,
};
exports.electricbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 3,
        SPEED: 5,             
        RANGE: 90,
        DENSITY: 1.25, 
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 8 * wepDamageFactor,
        PUSHABILITY: 1,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  40,     0,      0,      0,     0,  1], 
                    TYPE: exports.lightningcyan,
                        },
                      ],
            };
exports.lightningstrike = {
    LABEL: 'Lightning Strike',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
SHAPE: [[0,0.2],[0,-0.2],[10,-0.2],[20,-1.5],[30,1.5],[50,-0.5],[50,0],[30,2],[20,-1],[10,0.2]],
  BODY: {
        PENETRATION: 3,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        PUSHABILITY: 1,
    },
 //   FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullet2 = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: 4,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 1,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullett = {
    LABEL: 'Bullett',
    TYPE: 'tank',
    DANGER: 9,
    ACCEPTS_SCORE: true,
    COLOR: 16,
    BODY: {
        PENETRATION: 1,
        SPEED: 3,
        RANGE: 4269,
        DENSITY: 1.25,
        HEALTH: 0.9 * wepHealthFactor, 
        DAMAGE: 1.333 * wepDamageFactor,
        PUSHABILITY: 0,
    },
    VALUE: 69,
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    CAN_BE_ON_LEADERBOARD: true,
};
exports.lmaogetrektnoob = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1000,
        HEALTH: 6000 * wepHealthFactor,
        DAMAGE: 0.01 * wepDamageFactor,
        PUSHABILITY: 0, 
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,   
    HITS_OWN_TYPE: 'repel',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.tsbullet = {
    LABEL: 'B̸̗̰͈͕͈̰̜̯͇̥̀̚u̶̡̖̲̘̻͔͇͔̰̻̤͐l̴̝̟̦̖̬̜̹͕̖͇̟̝̳͇̏̽͋̿̑̿͝l̷̨͉̩͉̼͙̭͙̻̏̔̽̈́̎͑̑̃̽̿͌̈́̕͜e̵̲̻͆̀t̴̤̻̮͔̖̻̠̜̻̙̯̦͖̤̽͐̈́̈̔̇̀͐̔͘ͅ',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bulletbutitsfuckingstupidashell = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
  SHAPE: [[0.5,-0.15],[1.05,-0.1],[1.85,0.2],[0.45,0.2],[-1,0.2],[-1,-0.2],[0.45,-0.2]],
    BODY: {
        PENETRATION: 10,
        SPEED: 3,
        RANGE: 140,
        DENSITY: 3,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 6 * wepDamageFactor,
        PUSHABILITY: 0.6,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
}; 
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
    exports.casingpink = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 3,
    };
    exports.casingwhite = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 8,
    };
    exports.casingblue = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 10,
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 1,
        FOV: 2,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.elitaLoverSwarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: [[0.5,-0.15],[1.05,-0.1],[1.85,0.2],[0.45,0.2],[-1,0.2],[-1,-0.2],[0.45,-0.2]],
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 250,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 1,
        FOV: 2,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.twiniwtswarm = {
    LABEL: 'BullelluB',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: [[-1.03,0.55],[0.5,-1],[0.254,0.17],[1,0.5],[0.5,1],[0.17,0.294]],
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        PENETRATION: 10,
        SPEED: 10,
        RANGE: 900,
        DENSITY: 0.04,
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        PUSHABILITY: 5,
        FOV: 5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.millieswarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 4.5,
        RANGE: 170,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 1,
        FOV: 50,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.metaswarm = {
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.swarm2 = {
    LABEL: 'Needle',
    TYPE: 'swarm',
    ACCEPTS_SCORE: true,
    SHAPE: [[-1,0.4],[-1,-0.4],[1.8,0]],
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 2,
        PENETRATION: 0.8, 
        HEALTH: 1.8 * wepHealthFactor,
        DAMAGE: 1.8 * wepDamageFactor,
        SPEED: 12,
        RESIST: 1.6,
        RANGE: 220,
        DENSITY: 1.5,
        PUSHABILITY: 0.1,
        FOV: 9,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
exports.bee2 = {
    PARENT: [exports.swarm],
    LABEL: 'Bee',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 4,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: { 
        ACCELERATION: 1,
        PENETRATION: 0.8,
        HEALTH: 0.8 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        SPEED: 6.5,
        RESIST: 1.6,
        RANGE: 300,
        DENSITY: 8,
        PUSHABILITY: 0.85,
        FOV: 2,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
    PERSISTS_AFTER_DEATH: true,         
    HITS_OWN_TYPE: 'hardWithBuffer',
};
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
        PUSHABILITY: 2,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };

    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };
    exports.broomerang = {
        LABEL: 'Broomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['broomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 5,
            RANGE: 250, 
            DAMAGE: 48,
            HEALTH: 2000,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 1,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.eyedrone = {
    LABEL: '?̶̛͉̖͚͍̬͚͎͈͗̎̓̎̈́͒͐̋̓̈́͜͝͝?̴͓̝̼̹̜̻̰͖̣̓͂̓͘?̵̯̙̞̺̜̰͔̺̒̔̀͛̾͌͋͂͘͝?̸̞̥̉̑̍͊?̴̼̫̯̗̟̼̻͎̣̯̘͇͍̼̩̊̌̏͊͋̏̀͑̒̇͌͜',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 0,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 1,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
};
exports.starcolonthree = {
    LABEL: 'Star :3',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: [[0.3,-1.023],[0.287,-0.31],[1,0],[0.265,0.25],[0.304,0.995],[-0.21,0.395],[-1,0.7],[-0.536,-0.01],[-0.986,-0.8],[-0.23,-0.44]],
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 0.08,
        PUSHABILITY: 1,
        ACCELERATION: 0.02,
        HEALTH: 5 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        SPEED: 13,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 2,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.done = {
    LABEL: 'Done',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 20,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 0.8,
        PUSHABILITY: 1,
        ACCELERATION: 0.05,
        HEALTH: wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        SPEED: 25.8,
        RANGE: 200, 
        DENSITY: 0.03,
        RESIST: 1.7,
        FOV: 8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.6,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.sunchip2 = {
        PARENT: [exports.drone],
        SHAPE: 3,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.8,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
        INDEPENDENT: true,
    };
    exports.sunchip3 = {
        PARENT: [exports.drone],
        SHAPE: 0,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
        INDEPENDENT: true,
    };
    exports.sunchip4 = {
        PARENT: [exports.drone],
        SHAPE: 5,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 1,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
        INDEPENDENT: true,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.gigatest, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.gigatest, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };


// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
const gigatest = {
    ACCEL: 2,
    SPEED: 12,
    HEALTH: 50,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 7.5,
    REGEN: 0.025,
    FOV: 1.1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',  
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: gigatest.ACCEL,
        SPEED: gigatest.SPEED,
        HEALTH: gigatest.HEALTH, 
        DAMAGE: gigatest.DAMAGE, 
        PENETRATION: gigatest.PENETRATION, 
        SHIELD: gigatest.SHIELD,
        REGEN: gigatest.REGEN,
        FOV: gigatest.FOV,
        DENSITY: gigatest.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.badStats = {
    PARENT: [exports.genericTank],
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
};
exports.redball = {
        PARENT: [exports.genericTank],
        COLOR: 12,
        SHAPE: 0,
          };  
exports.redbullet = {
    PARENT: [exports.bullet],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  23,     0,      0,      0,     360,  1], 
                    TYPE: exports.redball,
                        },
              ],
}; 
exports.purpleball = {
        PARENT: [exports.genericTank],
        COLOR: 4,
        SHAPE: 0,
          };  
exports.purplebullet = {
    PARENT: [exports.bullet],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  23,     0,      0,      0,     360,  1], 
                    TYPE: exports.purpleball,
                        },
              ],
}; 
exports.purpletriangle = {
        PARENT: [exports.genericTank],
        COLOR: 4,
        SHAPE: 3,
          };
exports.purpleswarm = {
    PARENT: [exports.swarm],
    BODY: {
    SPEED: 12,
    ACCELERATION: 15,
    RANGE: 180,
    FOV: 10,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  23,     0,      0,      0,     0,  1], 
                    TYPE: exports.purpletriangle,
                        },
              ],
}; 
exports.grayhexagon = {
        PARENT: [exports.genericTank],
        CONTROLLERS: [],  
        COLOR: 16,
        SHAPE: 6,
        INDEPENDENT: true,
          };  
exports.cyanhexagon = {
        PARENT: [exports.genericTank],
        CONTROLLERS: [], 
        COLOR: 1500,
        SHAPE: 6,
        INDEPENDENT: true,
          }; 
    exports.gemtrap = { 
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -6,
        BODY: {
            SPEED: 1.5,
            DENSITY: 6,
            RANGE: 350,
        },
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.grayhexagon,
                        },
              ],
    };
let gun = { };
exports.edsthing = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 1125,
    SHAPE: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [],
};
exports.edsthingbutblue = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 2250,
    SHAPE: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [],
};
exports.hive505 = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 100,
            FOV: 0.5,
        },  
        FACING_TYPE: 'autospin',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   1,    9.5,    0.6,     0,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,      0,      -1,    0.02,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,      0,      1,    0.04,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,      0,      2,    0.06,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,     0,      -2,     0.08,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,      0,      -3,    0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.halfreload]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, },
        ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.edsthing,
                        },
              ],
    };
exports.hive508 = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 270,
            FOV: 0.5,
        },  
        FACING_TYPE: 'twist',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   1,    9.5,    0.6,     0,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doublereload, g.doublereload]),
                    TYPE: exports.bee2,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   1,    9.5,    0.6,     0,      0,      180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doublereload, g.doublereload]),
                    TYPE: exports.bee2,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, 
        ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  26,     0,      0,      0,     360,  0], 
                    TYPE: exports.edsthingbutblue,
                        },
              ],
    };
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.snipeturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 2, 
    },
    COLOR: 16,
    CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,    9,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.aaaaq]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.autoauto2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: { 
        FOV: 1.5,
    },
    COLOR: 16,
    CONTROLLERS: ['spin'],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     30,      0,      0,     360, 1], 
                    TYPE: [exports.snipeturret,  {INDEPENDENT: true,}]
                        }, {
                POSITION: [  14,     30,      0,     180,    360, 1], 
                    TYPE: [exports.snipeturret,  {INDEPENDENT: true,}]
                        },
            ],
};
exports.autoTurret2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 1,
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.rifleturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 1,
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle2]),
                            TYPE: exports.bullet,
                        }, },
    ],
};
exports.fuckyouturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 264,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [    20,    10,     -1.3,      0,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.op, g.shghgjkssfgdfgs, g.halfreload, g.halfreload, g.halfreload, g.lessreload]),
                        TYPE: exports.bulletbutitsfuckingstupidashell,
                        LABEL: 'sour FUCKING SWITCH BLADE',
                    }, },
    ],
};
exports.swarm3gun = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8,  
    },
    CONTROLLERS: ['spin'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7.5,    9,    0.6,     7,      0,      0,      0,   ],                                                             
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff2]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   7.5,    9,    0.6,     7,      2,      120,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff2]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   7.5,    9,    0.6,     7,     -2,     240,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff2]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                            AUTOFIRE: true,
                        }, }
                ],
            };
exports.rangergun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.zerorecoil, g.slow, g.lessreload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret', 
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, } 
    ],
};
exports.trapTurret1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0,
    },
    INDEPENDENT: true,
    FACING_TYPE: 'twist',
    CONTROLLERS: ['spin', 'spin1'],
    COLOR: 16, 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    11,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    11,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.doublereload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            }, },
    ],
};
exports.trapTurret01 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0,
    },
    INDEPENDENT: true,
    FACING_TYPE: 'twist',
    CONTROLLERS: ['spin', 'spin1'],
    COLOR: 16, 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    11,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    11,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.slow, g.big]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            }, },
    ],
};
exports.trapTurret11 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0, 
    },
    INDEPENDENT: true,
    FACING_TYPE: 'twist',
    COLOR: 16,
    TURRETS: [{ /*          SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,      0,      0,      0,     360,  1], 
                    TYPE: exports.trapTurret1,
                        },
              ],
};
exports.eyething1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 1125,
};
exports.eyething = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 200, 
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 18,
    TURRETS: [{ /*          SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,      6,      0,      0,     360,  1], 
                    TYPE: exports.eyething1,
                        },
              ],
};
exports.auto27gun = {
    PARENT: [exports.genericTank],
    LABEL: '', 
    BODY: {
        FOV: 0,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0,    10,     1,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.wrath]),
                    TYPE: exports.wrath,
                   AUTOFIRE: true,
                }, }, {
            POSITION: [  0,    10,     1,     0,      0,      90,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.wrath]),
                    TYPE: exports.wrath,
                   AUTOFIRE: true,
                }, }, {
            POSITION: [  0,    10,     1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.wrath]),
                    TYPE: exports.wrath,
                   AUTOFIRE: true,
                }, }, {
            POSITION: [  0,    10,     1,     0,      0,      270,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.wrath]),
                    TYPE: exports.wrath,
                   AUTOFIRE: true,
                }, },
    ],
};
exports.mini3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: { 
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 209,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                        TYPE: exports.bullet,
                    }, },
    ],
};
exports.stream3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: { 
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 209,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.auto]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.auto]),
                            TYPE: exports.bullet,
                        }, },
    ],
};
exports.stream3machgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: { 
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 209,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,     8,      1.35,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.mach, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1.35,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.mach, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1.35,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.mach, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1.35,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.mach, g.auto]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1.35,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.mach, g.auto]),
                            TYPE: exports.bullet,
                        }, },
    ],
};
exports.stream3machgun2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: { 
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 209,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  23,     9,      1.5,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     9,      1.5,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     9,      1.5,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  17,     9,      1.5,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  15,     9,      1.5,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, },
    ],
};
exports.stream3machgun3 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: { 
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 209,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     3,     4,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,     3,     4,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,     3,     4,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,     3,     4,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,     3,     4,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.machbuff, g.auto]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
exports.cruiserauto = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 17,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
          PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                  TYPE: exports.millieswarm,
                  STAT_CALCULATOR: gunCalcNames.swarm,  
                  AUTOFIRE: true,
        }, }, {
        POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
          PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                  TYPE: exports.millieswarm,
                  STAT_CALCULATOR: gunCalcNames.swarm, 
                  AUTOFIRE: true, 
        }, },
            ],
        };
exports.metagunauto = {
    PARENT: [exports.genericTank],
    LABEL: "I'M SO META",
    BODY: {
        FOV: 30,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.META]),
                TYPE: exports.metaswarm,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.attackergun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 1, 
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 8,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,    5,      1,      0,      3.5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.attack, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  30,    5,      1,      0,      -3.5,      0,      0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.attack, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  3.7,    13.8,      1,      20.5,      0,      0,      0,   ], 
                },
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.sniper4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3.5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 17,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.power, g.aaaad]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.whiteball = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 8,
        INDEPENDENT: true,
        GUNS: [],                
          };

exports.controllerbutton1 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 259,
        INDEPENDENT: true,
        GUNS: [],                
          };
exports.controllerbutton2 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 260,
        INDEPENDENT: true,
        GUNS: [],
};
  exports.controllerbutton3 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 261,
        INDEPENDENT: true,
        GUNS: [],
  };
          exports.controllerbutton4 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 262,
        INDEPENDENT: true,
        GUNS: [],
          };
exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.betterauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  19,     4.5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.better4]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  19,     4.5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.better4]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.cutecatsgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        FOV: 2,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 17,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     7,      1,      0,    5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  17,     7,      1,      0,     -5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  19,     7,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.pbgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        FOV: 2.5,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 9,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     7,      1,      0,    5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  17,     7,      1,      0,     -5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  19,     7,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.overlordauto = {
        PARENT: [exports.genericTank],
        LABEL: '', 
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 17,
        MAX_CHILDREN: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
    exports.bigauto44gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 18,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,     5,      1,      0,    -6.5,     0,      0.667,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  12,     5,      1,      0,     6.5,     0,     0.667,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0.333,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.333,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.bigauto43gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 3,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,     5,      1,      0,    -6.5,     0,      0.667,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  12,     5,      1,      0,     6.5,     0,     0.667,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0.333,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.333,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.bigauto46gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 18,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,     5,      1,      0,    -6.5,     0,      0.667,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  12,     5,      1,      0,     6.5,     0,     0.667,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0.333,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.333,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     10,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.bigauto56gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 8,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     10,      1,      0,    -6.5,     0,      0.667,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  15,     10,      1,      0,     6.5,     0,     0.667,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  17,     10,      1,      0,    -4.5,     0,      0.333,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  17,     10,      1,      0,     4.5,     0,     0.333,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  19,     10,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.morereload, g.fast, g.fast, g.fast]),
                    TYPE: exports.trap,
                }, }
        ],
    };
exports.bigauto0gun = { 
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 13,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     19,      1,      0,    0,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast, g.fast, g.machgun, g.doublereload]),
                    TYPE: exports.bullet,
                }, }, 
        ],
    };
exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.lightning = {
    LABEL: '',
    COLOR: 3,
    SHAPE: [[-1,0],[-0.2,0.2],[0.1,-0.4],[1,0],[0.2,-0.2],[0,0.4]],
    INDEPENDENT: false,
};
exports.youKnowIReallyJustWishIWasAGirl = {
    LABEL: '',
    COLOR: 127,
SHAPE: [[0.007,-0.193],[0.607,-0.213],[1.4,0.513],[3.007,0.8],[1.407,0.933],[0.61,0.2],[0.007,0.2]],
  INDEPENDENT: false,
};
exports.youKnowIReallyJustWishIWasAGirl2 = {
    LABEL: '',
    COLOR: 127,
SHAPE: [[0.007,0.193],[0.607,0.213],[1.4,-0.513],[3.007,-0.8],[1.407,-0.933],[0.61,-0.2],[0.007,-0.2]],
  INDEPENDENT: false,
};
exports.divthing = {
    LABEL: '',
    COLOR: 3,
    SHAPE: [[0,-1],[0.2,-0.2],[1,0],[0.2,0.2],[0,1],[-0.2,0.2],[-1,-0.01],[-0.2,-0.2]],
    INDEPENDENT: false,
};
exports.healgunthing = {
    LABEL: '',
    COLOR: 5,
    SHAPE: [[-1.01,-0.4],[1,-0.4],[1,0.4],[-1,0.4]],
    INDEPENDENT: false,
};
exports.thingy = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: [[0.18,-0.9],[1.593,-0.75],[1.11,1.36],[1,0.5],[-1.22,-0.09],[-0.527,0.45],[-2.1,0.87],[-2.99,-0.05],[-0.33,-1.86],[1.83,-1.33]],
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.minion267 = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'locksFacing',
    BODY: {
        FOV: 3,
        SPEED: 3.5,
        ACCELERATION: 2,
        HEALTH: 14, 
        SHIELD: 1.2,
        DAMAGE: 1.9,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'mapTargetToGoal', 'hangOutNearMaster'],
    GUNS: [],
};
exports.smasherBody12 = {
    LABEL: '',
    CONTROLLERS: ['steroidspin'], 
    COLOR: 225,
    SHAPE: -5,
    INDEPENDENT: true,
};
let smshskl = 12; //13;
exports.accelerm = { 
            PARENT: [exports.minion267],
            CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
            LABEL: 'hahaha',
            DANGER: 1, 
            BODY: {
                FOV: gigatest.FOV * 0.6,
                DENSITY: gigatest.DENSITY * 2,
                ACCELERATION: gigatest.ACCEL * 5,
                DAMAGE: gigatest.DAMAGE * 30,
                PENETRATION: gigatest.PENETRATION * 0.05,
                HEALTH: 3,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody12,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.pillboxTurret = {
    PARENT: [exports.genericTank], 
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: gigatest.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret2, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
exports.autopentagon = makeAuto(exports.pentagon);
exports.autodrone = makeAuto(exports.drone);
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
}; 

exports.absorber = {
    PARENT: [exports.genericTank],
    LABEL: 'ABSORBER FBVY$UB%(RN $HN%(U(UF%BUHWIU()JR$(*OHHF($OIU(*CH$UH$IUR))))))',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.aaaab]),
            TYPE: exports.bullet,
        }, }, 
    ],
}; 
exports.gimme_kiss = {
    PARENT: [exports.genericTank],
    LABEL: 'GIMME KISS',
    BODY: {
      SPEED: gigatest.SPEED * 1.8,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  12,     12,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.fast, g.fast, g.fast, g.fast, g.fast, g.aaaag]),
            TYPE: exports.bullet,
            LABEL: 'SMOOCHIE',                  // def
              }, }, {
        POSITION: [  14,     5,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.aaaah]),
            TYPE: exports.bullet,
            LABEL: 'LALALALAA',                  // def
              }, }, {
        POSITION: [  12,     5,      1,      0,      0,      180,      0.33,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.aaaah]),
            TYPE: exports.bullet,
            LABEL: 'LALALALAA',                  // def
              }, }, 
    ],
}; 
exports.squarebasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    SHAPE: 4,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest]),
            TYPE: exports.bullet2,
          
        }, }, 
    ],
}; 
exports.healingtank = {
    PARENT: [exports.genericTank],
    LABEL: 'healer',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.healing]),
            TYPE: exports.bullet,
            LABEL: 'Healing',                  
        }, }, 
    ],
}; 
exports.deflect = {
    PARENT: [exports.genericTank],
    LABEL: 'fucking deflect everything',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  23,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.boombaby]),
            TYPE: exports.lmaogetrektnoob,
        }, }, 
    ],
}; 
exports.healingtriplet = {
    PARENT: [exports.genericTank],
    LABEL: 'thingymabob',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  19,     7,      1,      0,      6,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.healing, g.lessreload]),
            TYPE: exports.bullet,
            LABEL: 'Healing',                  
        }, }, {
        POSITION: [  19,     7,      1,      0,      -6,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.healing, g.lessreload]),
            TYPE: exports.bullet,
            LABEL: 'Healing',                  
        }, }, {
        POSITION: [  21,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.lessreload]),
            TYPE: exports.bullet,
        }, }, 
    ],
}; 
exports.health = {
    PARENT: [exports.genericTank],
    LABEL: 'invincible useless tank',
    BODY: {
      HEALTH: gigatest.HEALTH * 10001,
      DAMAGE: 0.003,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.fake]),
            TYPE: exports.bullet,
        }, },  
    ],
};
exports.funnytanks = {
    PARENT: [exports.genericTank],
    LABEL: 'h',
    BODY: {
      HEALTH: gigatest.HEALTH * 10001,
      DAMAGE: 0.003,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  24,     6,      0.2,      7,      6,      22.3,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.fake]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.number1W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,-0.1],[0.7,-0.4],[1,-0.4],[1,0.2],[-1,0.2],[-1,-0.1]],
    INDEPENDENT: true,
};
exports.number2W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,-0.8],[1,-0.8],[1,0.2],[0,0.2],[0,-0.5],[-0.7,-0.5],[-0.7,0.2],[-1,0.2],[-1,-0.8],[0.3,-0.8],[0.3,-0.1],[0.7,-0.1]],
    INDEPENDENT: true,
};
exports.number3W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,-0.8],[1,-0.8],[1,0.2],[-1,0.2],[-1,-0.8],[-0.7,-0.8],[-0.7,-0.1],[-0.1,-0.1],[-0.1,-0.8],[0.2,-0.8],[0.2,-0.1],[0.7,-0.1]],
    INDEPENDENT: true,
};
exports.number4W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.2,-0.1],[1,-0.1],[1,0.2],[-1,0.2],[-1,-0.1],[-0.1,-0.1],[-0.1,-0.8],[1,-0.8],[1,-0.5],[0.2,-0.5]],
    INDEPENDENT: true,
};
exports.number5W = { 
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,0.8],[1,0.8],[1,-0.2],[0,-0.2],[0,0.5],[-0.7,0.5],[-0.7,-0.2],[-1,-0.2],[-1,0.8],[0.3,0.8],[0.3,0.1],[0.7,0.1]],
    INDEPENDENT: true,
};
exports.number6W = { 
    LABEL: '',
    COLOR: 8,
SHAPE: [[0.697,0.3],[0.7,-0.5],[0.2,-0.5],[0.2,0],[-0.1,0],[-0.1,-0.5],[-0.7,-0.5],[-0.7,0],[0.2,0],[0.2,0.3],[-1,0.3],[-1,-0.8],[1,-0.8],[1,0.3]],
  INDEPENDENT: true,
};
exports.number7W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,-0.5],[0.4,-0.5],[0.4,-0.8],[1,-0.8],[1,0.2],[-1,0.2],[-1,-0.1],[0.7,-0.1]],
    INDEPENDENT: true,
};
exports.number8W = {
    LABEL: '',
    COLOR: 8,
SHAPE: [[0.7,-0.3],[0.7,0.5],[0.2,0.5],[0.2,0],[-0.1,0],[-0.1,0.5],[-0.7,0.5],[-0.7,0],[0.7,0],[0.7,-0.3],[-1,-0.3],[-1,0.8],[1,0.8],[1,-0.3]],
  INDEPENDENT: true,
};
exports.number9W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[-0.697,-0.3],[-0.7,0.5],[-0.2,0.5],[-0.2,0],[0.1,0],[0.1,0.5],[0.7,0.5],[0.7,0],[-0.2,0],[-0.2,-0.3],[1,-0.3],[1,0.8],[-1,0.8],[-1,-0.3]],
    INDEPENDENT: true,
};
exports.number0W = {
    LABEL: '',
    COLOR: 8,
    SHAPE: [[0.7,-0.3],[0.7,0.5],[-0.7,0.5],[-0.7,0],[0.7,0],[0.7,-0.3],[-1,-0.3],[-1,0.8],[1,0.8],[1,-0.3]],
    INDEPENDENT: true,
};
exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.3,
        HEALTH: 10,
        SHIELD: 0.5,
        DAMAGE: 1.05,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
};
exports.minion1 = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.58,
        SPEED: 3.2,
        ACCELERATION: 0.4,
        HEALTH: 12,
        SHIELD: 0.5,
        DAMAGE: 1.08,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.op]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,    0,      -7,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  14,     0,      7,      180,     360,  1], 
            TYPE: exports.number5W,
    }, 
    ],
};
exports.minion2 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.58,
        SPEED: 3.2,
        ACCELERATION: 0.4,
        HEALTH: 12,
        SHIELD: 0.5,
        DAMAGE: 1.08,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion1,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  13,    0,      -6.5,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  13,     0,      6.5,      180,     360,  1], 
            TYPE: exports.number4W,
    }, 
    ],
};
exports.minion3 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.58,
        SPEED: 3.2,
        ACCELERATION: 0.4,
        HEALTH: 12,
        SHIELD: 0.5,
        DAMAGE: 1.08,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    MAX_CHILDREN: 1,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion2,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,    0,      -6,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  12,     0,      6,      180,     360,  1], 
            TYPE: exports.number3W,
    }, 
    ],
};
exports.minion4 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.58,
        SPEED: 3.2,
        ACCELERATION: 0.4,
        HEALTH: 12,
        SHIELD: 0.5,
        DAMAGE: 1.08,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion3,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,    0,      -5.5,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  12,     0,      5.5,      180,     360,  1], 
            TYPE: exports.number2W,
    }, 
    ],
};
exports.minion5 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.58,
        SPEED: 3.2,
        ACCELERATION: 0.4,
        HEALTH: 12,
        SHIELD: 0.5,
        DAMAGE: 1.08,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion4,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,    0,      -4,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  10,     0,      4,      180,     360,  1], 
            TYPE: exports.number1W,
    }, 
    ],
};
exports.minion6 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.625,
        SPEED: 3.125,
        ACCELERATION: 0.4,
        HEALTH: 16,
        SHIELD: 0.6,
        DAMAGE: 1.15,
        RESIST: 1,
        PENETRATION: 1.5,
        DENSITY: 1.05,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion5,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,    0,      -4,      180,     360,  1], 
            TYPE: exports.number2W,
    }, {
      POSITION: [  10,     0,      4,      180,     360,  1], 
            TYPE: exports.number0W,
    }, 
    ],
};
exports.minion7 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.625,
        SPEED: 3.125,
        ACCELERATION: 0.4,
        HEALTH: 16,
        SHIELD: 0.6,
        DAMAGE: 1.15,
        RESIST: 1,
        PENETRATION: 1.5,
        DENSITY: 1.05,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion6,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,    0,      -4,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  10,     0,      4,      180,     360,  1], 
            TYPE: exports.number9W,
    }, 
    ],
};
exports.minion8 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.625,
        SPEED: 3.125,
        ACCELERATION: 0.4,
        HEALTH: 16,
        SHIELD: 0.6,
        DAMAGE: 1.15,
        RESIST: 1,
        PENETRATION: 1.5,
        DENSITY: 1.05,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion7,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,    0,      -3.5,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  9,     0,      3.5,      180,     360,  1], 
            TYPE: exports.number8W,
    }, 
    ],
};
exports.minion9 = {
    PARENT: [exports.genericTank],
      STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.625,
        SPEED: 3.125,
        ACCELERATION: 0.4,
        HEALTH: 16,
        SHIELD: 0.6,
        DAMAGE: 1.15,
        RESIST: 1,
        PENETRATION: 1.5,
        DENSITY: 1.05,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion8,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,    0,      -3.5,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  9,     0,      3.5,      180,     360,  1], 
            TYPE: exports.number7W,
    }, 
    ],
};
exports.minion10 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.625,
        SPEED: 3.125,
        ACCELERATION: 0.4,
        HEALTH: 16,
        SHIELD: 0.6,
        DAMAGE: 1.15,
        RESIST: 1,
        PENETRATION: 1.5,
        DENSITY: 1.05,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion9,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,    0,      -3.5,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  9,     0,      3.5,      180,     360,  1], 
            TYPE: exports.number6W,
    }, 
    ],
};
exports.minion11 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.7,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 20,
        SHIELD: 0.7,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1.7,
        DENSITY: 1.1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion10,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -3,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      3,      180,     360,  1], 
            TYPE: exports.number5W,
    }, 
    ],
};
exports.minion12 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.7,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 20,
        SHIELD: 0.7,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1.7,
        DENSITY: 1.1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion11,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -3,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      3,      180,     360,  1], 
            TYPE: exports.number4W,
    }, 
    ],
};
exports.minion13 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.7,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 20,
        SHIELD: 0.7,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1.7,
        DENSITY: 1.1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion12,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -3,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      3,      180,     360,  1], 
            TYPE: exports.number3W,
    }, 
    ],
};
exports.minion14 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.7,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 20,
        SHIELD: 0.7,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1.7,
        DENSITY: 1.1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion13,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -3,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      3,      180,     360,  1], 
            TYPE: exports.number2W,
    }, 
    ],
};
exports.minion15 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.7,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 20,
        SHIELD: 0.7,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1.7,
        DENSITY: 1.1,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion14,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -2,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      2,      180,     360,  1], 
            TYPE: exports.number1W,
    }, 
    ],
};
exports.minion16 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.75,
        ACCELERATION: 0.4,
        HEALTH: 25,
        SHIELD: 0.9,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.2,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion15,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,    0,      -3,      180,     360,  1], 
            TYPE: exports.number1W,
    }, {
      POSITION: [  8,     0,      3,      180,     360,  1], 
            TYPE: exports.number0W,
    }, 
    ],
};
exports.minion17 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.75,
        ACCELERATION: 0.4,
        HEALTH: 25,
        SHIELD: 0.9,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.2,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion16,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1], 
            TYPE: exports.number9W,
    }, ],
};
exports.minion18 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.75,
        ACCELERATION: 0.4,
        HEALTH: 25,
        SHIELD: 0.9,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.2,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion17,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1], 
            TYPE: exports.number8W,
    },  ],
};
exports.minion19 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.75,
        ACCELERATION: 0.4,
        HEALTH: 25,
        SHIELD: 0.9,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.2,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion18,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11.5,     -3,      0,      180,     360,  1], 
            TYPE: exports.number7W,
    }, ],
};
exports.minion20 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.75,
        ACCELERATION: 0.4,
        HEALTH: 25,
        SHIELD: 0.9,
        DAMAGE: 1.25,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.2,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion19,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      180,     360,  1], 
            TYPE: exports.number6W,
    }, ],
};
exports.minion21 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 30,
        SHIELD: 1,
        DAMAGE: 1.3,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion20,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      180,     360,  1], 
            TYPE: exports.number5W,
    }, ],
};
exports.minion22 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 30,
        SHIELD: 1,
        DAMAGE: 1.3,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion21,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     -3,      2,      180,     360,  1], 
            TYPE: exports.number4W,
    }, ],
};
exports.minion23 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 30,
        SHIELD: 1,
        DAMAGE: 1.3,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion22,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.number3W,
    }, ],
};
exports.minion24 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 30,
        SHIELD: 1,
        DAMAGE: 1.3,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion23,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1], 
            TYPE: exports.number2W,
    }, ],
};
exports.minion25 = {
    PARENT: [exports.genericTank],
    STAT_NAMES: statnames.generic,
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.8,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 30,
        SHIELD: 1,
        DAMAGE: 1.3,
        RESIST: 1,
        PENETRATION: 2,
        DENSITY: 1.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    MAX_CHILDREN: 1,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.minion24,
        }, }, {
         POSITION: [  17,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.minion, g.halfreload, g.halfreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1], 
            TYPE: exports.number1W,
    }, ],
    
};

exports.wtf = {
    PARENT: [exports.genericTank],
    MAX_CHILDREN: 1,
    STAT_NAMES: statnames.drone,
    LABEL: 'inception tank',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     30,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.meta]),
            TYPE: exports.minion25,
            AUTOFIRE: true,   
        }, }, 
    ],
};
 
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
            exports.foreversingle = {
                PARENT: [exports.genericTank],
                LABEL: 'Single but MORE SINGLE!!!!!!!! (most creative idea in MS arras)',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8.5,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.single, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8.5,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        
        let frbgrefernjneigrnegigtjng = 99999999999;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: gigatest.FOV * 1.05,
                DENSITY: gigatest.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
      exports.acceler = {
            PARENT: [exports.genericTank],
            LABEL: 'hahaha', 
            DANGER: 10,
            BODY: {
                FOV: gigatest.FOV * 0.6,
                DENSITY: gigatest.DENSITY * 0.1,
                ACCELERATION: gigatest.ACCEL * 5,
                DAMAGE: gigatest.DAMAGE * 14.5,
                PENETRATION: gigatest.PENETRATION * 0.003,
                PUSHABILITY: 10,
                REGEN: gigatest.REGEN * 0.3,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody12,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.smash2 = {
            PARENT: [exports.genericTank],
            LABEL: 'SmasherrrrrrrrrrRRRRRRRRRRRRRRRRRrrrr',
            DANGER: 2,
            BODY: {
                FOV: gigatest.FOV * 1.6,
                DENSITY: gigatest.DENSITY * 2.5,
                SPEED: gigatest.SPEED * 10,
                ACCELERATION: gigatest.ACCEL * 0.003,
                DAMAGE: gigatest.DAMAGE * 5,  
                PUSHABILITY: 5,
            },
            SIZE: 4,
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher, 
        };
        exports.wptrg98 = {
            PARENT: [exports.genericTank],
            LABEL: 'gorg',
            DANGER: 10,
            BODY: {
                FOV: gigatest.FOV * 1.37,
                DENSITY: gigatest.DENSITY * 20, 
                REGEN: gigatest.REGEN * 4,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  23,   0,      0,      0,     360,  0,], 
                TYPE: exports.thingy,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: gigatest.speed * 1.05,
                    FOV: gigatest.FOV * 1.1,
                    DENSITY: gigatest.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: gigatest.speed*0.9,
                    DAMAGE: gigatest.DAMAGE * 1.1,
                    FOV: gigatest.FOV * 1.05,
                    DENSITY: gigatest.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: gigatest.DAMAGE * 1.15,
                    FOV: gigatest.FOV * 1.05,
                    DENSITY: gigatest.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
    exports.twiniwt = {
        PARENT: [exports.genericTank],
        LABEL: 'TwiniwT',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     6,      1,      0,     7,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.halfreload, g.halfreload, g.aaaaj]),
                TYPE: exports.twiniwtswarm,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     6,      1,      0,    0,     0,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.fake]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,     6,      1,      0,    -7,     0,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.halfreload, g.halfreload, g.aaaaj]),
                TYPE: exports.twiniwtswarm,
            }, },
        ],
    };
    exports.twin2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        SHAPE: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin]),
                TYPE: exports.bullet2,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.twin]),
                TYPE: exports.bullet2,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.ggbro = {
            PARENT: [exports.genericTank], 
            LABEL: 'hi',
            DANGER: 6,
            BODY: {
              ACCELERATION: base.ACCEL * 0.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  8,    13.5,     1,      33.5,     0,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunneD, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  6,    9,     1,      26,    -0.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunneC, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  6,    6.5,     1,      19,     0,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunneB, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  8,    4,     1,      10,    -0,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunneA, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.gunner2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            SHAPE: 4,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet2,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet2,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet2,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet2,
                    }, }, 
            ],
        };
        exports.gnuuer = {
            PARENT: [exports.genericTank],
            LABEL: 'Gnuuer',
            BODY: {
              ACCELERATION: gigatest.ACCEL * 0.2,
              FOV: gigatest.FOV * 0.8333,
            },
            DANGER: 7,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast, g.gnuuer]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast, g.gnuuer]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast, g.gnuuer]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.fast, g.gnuuer]),
                        TYPE: exports.bullet,
                    }, }, {
                 POSITION: [  11,    6,     1,      0,    -3.75,    0,     0.25, ], 
                    }, {
                 POSITION: [  11,    6,     1,      0,    3.75,    0,     0.25, ], 
                    }, {
                 POSITION: [  8,    6,     1,      0,    -7.25,    0,     0.25, ], 
                    }, {
                 POSITION: [  8,    6,     1,      0,    7.25,    0,     0.25, ], 
                    }
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: gigatest.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.machinegunner2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                SHAPE: 4,
                BODY: {
                    SPEED: gigatest.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet2,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet2,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet2,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet2,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet2,
                        }, }, 
                ]
            };
            exports.autogunner2 = makeAuto(exports.gunner2); 
            exports.autogunner = makeAuto(exports.gunner); 
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: gigatest.FOV * 1.1,
                    SPEED: gigatest.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };
        exports.nailgun2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                SHAPE: 4,
                DANGER: 7,
                BODY: {
                    FOV: gigatest.FOV * 1.1,
                    SPEED: gigatest.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  5.5,    8,    1,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.double2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            SHAPE: 4,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet2,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet2,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet2,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double]),
                        TYPE: exports.bullet2,
                    }, }, 
            ],
        };
        exports.doubletw9xN = {
            PARENT: [exports.genericTank],
            LABEL: 'D7udl3 Tv9xN',
            DANGER: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      0.5,      0,     4,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      0.5,      0,    -4,     0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      0.5,      0,     4,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      0.5,      0,    -4,    180,    0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, 
            ],
        };  
        exports.boredashell = {
            PARENT: [exports.genericTank],
            LABEL: 'bored as hell',
            DANGER: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  26,     11,      1,      0,     0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      0.5,      0,     4,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      0.5,      0,    -4,    180,    0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, 
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     20,      0,      0,      0, 1], 
                        TYPE: exports.trapTurret11,
                            },
                      ],
        };  
        exports.diversionist = {
            PARENT: [exports.genericTank],
            LABEL: 'Diversionist',
            BODY: {
              FOV: gigatest.FOV * 1.3,
            },
            DANGER: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      0.6,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      1.4,      0,    -5.5,     0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      0.6,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, {
                POSITION: [  20,     8,      1.4,      0,    -5.5,    180,    0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.badreloadfr]),
                        TYPE: exports.bullett,
                    }, }, 
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     0,      0,      0,      0, 1], 
                        TYPE: exports.divthing,
                            },
                      ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.tripletwin2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                SHAPE: 4,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet2,
                        }, }, 
                ],
            };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                SHAPE: 4,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble2 = makeAuto(exports.double2, 'Auto-Double');
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.split2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                SHAPE: 4,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet2,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet2,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: gigatest.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.genderbender = {
            PARENT: [exports.genericTank],
            LABEL: 'GENDER BENDER (PLAYING THIS WILL MAKE YOU CHANGE YOUR GENDER!)',
            DANGER: 8,
            BODY: {
                SPEED: gigatest.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  25,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  28,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.bent2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            SHAPE: 4,
            BODY: {
                SPEED: gigatest.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet2,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet2,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                        TYPE: exports.bullet2,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: gigatest.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
      exports.gurglingwater = {
                PARENT: [exports.genericTank],
                LABEL: 'Gurgling Water',
                DANGER: 10,
                BODY: {
                    SPEED: gigatest.SPEED * 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  8,     8,      1,      0,     -9,    -120,    0.889, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  8,     8,      1,      0,      9,     120,    0.889, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  10,     8,      1,      0,     -8,    -105,    0.778, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  10,     8,      1,      0,      8,     105,    0.778, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  12,     8,      1,      0,     -7,    -90,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     8,      1,      0,      7,     90,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  14,     8,      1,      0,     -6,    -75,    0.555, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      6,     75,    0.555, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  16,     8,      1,      0,     -5,    -60,    0.444, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      5,     60,    0.444, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  18,     8,      1,      0,     -4,    -45,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      4,     45,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {  
                    POSITION: [  20,     8,      1,      0,     -3,    -30,    0.222, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,      3,     30,    0.222, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,     -2,    -15,    0.111, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      2,     15,    0.111, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: gigatest.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.twiplit = {
            PARENT: [exports.genericTank],
            DANGER: 100,
            BODY: {
                FOV: gigatest.FOV * 1.4,
                SPEED: gigatest.SPEED * 9,
                ACCEL: gigatest.ACCEL * 0.2,
            },
            LABEL: 'JAJAJAJAJA',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    2,      1,      0,      5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, { 
                POSITION: [  18,    2,      1,      0,     -5,      0,     0,  ], 
                    PROPERTIES: {                    
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {  
                POSITION: [  21,    2,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [  0,    2,      1,      0,      0,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.muchmorerecoil, g.fake]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, 
            ],
        };
        exports.twiplit2 = {
            PARENT: [exports.genericTank],
            DANGER: 200,
            BODY: {
                FOV: gigatest.FOV * 1.7,
                SPEED: gigatest.SPEED * 10,
                ACCEL: gigatest.ACCEL * 0.3,
            },
            LABEL: 'JAJAJAJAJAJAJA',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    2,      1,      0,      5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple2]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, { 
                POSITION: [  21,    2,      1,      0,     -5,      0,     0,  ], 
                    PROPERTIES: {                    
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple2]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {  
                POSITION: [  25,    2,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.twiple2]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [  0,    2,      1,      0,      5,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.tonsmorrecoil, g.fake]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, { 
                POSITION: [  0,    2,      1,      0,     -5,      180,     0,  ], 
                    PROPERTIES: {                    
                        SHOOT_SETTINGS: combineStats([g.basic, g.tonsmorrecoil, g.fake]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {  
                POSITION: [  0,    2,      1,      0,      0,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.tonsmorrecoil, g.fake]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, 
            ],
        };
        exports.churner = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                SPEED: gigatest.SPEED * 0.85,
                FOV: gigatest.FOV * 0.9, 
            },
            LABEL: 'Churner',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,    6,      1,      0,      3.5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, {  
                POSITION: [  15,    6,      1,      0,     -3.5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.whip = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            BODY: {
                SPEED: gigatest.SPEED * 0.85,
                FOV: gigatest.FOV * 1.05,
            },
            LABEL: 'Whipper',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,    6,      1,      0,      4.5,      -5,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.whip, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,     -4.5,      5,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.whip, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.whip, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.packer = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            BODY: {
                SPEED: gigatest.SPEED * 0.85,
                FOV: gigatest.FOV * 0.9,
            },
            LABEL: 'Packer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  15,    6,      1,      0,      7,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.pack, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,     -7,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.pack, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  15,    6,      1,      0,      3.5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.pack, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,     -3.5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.pack, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  15,    6,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.churn, g.pack, g.lessreload, g.nospray]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
         exports.friple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: gigatest.FOV * 1.05,
            },
            LABEL: 'Friplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    2,      1,      0,      2,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.machgun, g.machgun, g.machgun, g.machgun]),
                        TYPE: exports.bee,
                    }, }, { 
                POSITION: [  18,    2,      1,      0,     -2,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.machgun, g.machgun, g.machgun, g.machgun]),
                        TYPE: exports.bee,
                    }, }, { 
                POSITION: [  21,    2,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.machgun, g.machgun, g.machgun, g.machgun, g.fast]),
                        TYPE: exports.bee,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: gigatest.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: gigatest.ACCEL * 0.8,
                    FOV: gigatest.FOV * 1.1,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: gigatest.ACCEL * 0.7, 
            FOV: gigatest.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
          exports.electric_railcannon = {
                PARENT: [exports.genericTank],
                LABEL: 'Electric Railcannon',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  13,     10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon, g.strike]),
                            TYPE: exports.lightningstrike, 
                        }, }, {
                    POSITION: [  13,     10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, {
                    POSITION: [  1.5,     10,      1,      16,      0,      0,      0.01,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, {
                    POSITION: [  1.5,     10,      1,      20,      0,      0,      0.02,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, {
                    POSITION: [  1.5,     10,      1,      24,      0,      0,      0.03,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, {
                    POSITION: [  1.5,     10,      1,      28,      0,      0,      0.04,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, { 
                    POSITION: [  1.5,     10,      1,      32,      0,      0,      0.05,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle, g.rcannon]),
                            TYPE: exports.electricbullet,
                        }, }, {
                  POSITION: [  36,    2,    1,      0,      5.7,      0,      0,   ], 
                        }, {
                    POSITION: [  36,    2,    1,      0,      -5.7,      0,      0,   ], 
                        }, 
                    
                ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     0,  1], 
                    TYPE: exports.lightningcyan,
                        },
                      ],
            };
        exports.HUH = {
                PARENT: [exports.genericTank],
                LABEL: "NameDeleted2",
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      -3,      35,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      -3,      35,      0,   ], 
                         }, {
                    POSITION: [  14,     7,      1,      24,      3,      -35,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
        exports.hitman = {
                PARENT: [exports.genericTank],
                LABEL: 'HITMAN',
                DANGER: 40,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                    SPEED: gigatest.SPEED * 0.025,
                    FOV: gigatest.FOV * 2.25,
                    HEALTH: 0.001,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  30,    2,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  34,     1,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.aaaac]),
                            TYPE: exports.bullet,
                            ALT_FIRE: true,
                        }, },
                ],
            };
        exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  18,    19.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  22,     7,      1,      0,      4.15,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     7,      1,      0,      -4.15,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.6,
                SPEED: gigatest.SPEED * 0.85,
                FOV: gigatest.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
        exports.knockback = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            LABEL: 'Knockerbacker',
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.7,
                FOV: gigatest.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    6,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.knockb]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    5.5,    1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.5,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.assass, g.ranger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.stRangerdanger = {
                PARENT: [exports.genericTank],
                LABEL: '(Stream) Sniper',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "");

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.7,
                SPEED: gigatest.SPEED * 0.9,
                FOV: gigatest.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                    SPEED: gigatest.SPEED * 0.85,
                    FOV: gigatest.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,   0,  0, 0,    0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.xxx = {
                PARENT: [exports.genericTank],
                LABEL: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Hunter',
                DANGER: 70,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 7,
                    SPEED: gigatest.SPEED * 8.5,
                    FOV: gigatest.FOV * 2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  120,     1,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  117,    2,      1,      0,      0,      0,     0.01, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  114,    3,      1,      0,      0,      0,     0.02,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  111,    4,      1,      0,      0,      0,     0.03,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  108,    5,      1,      0,      0,      0,     0.04,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  105,    6,      1,      0,      0,      0,     0.05,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  102,    7,      1,      0,      0,      0,     0.05,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  99,    8,      1,      0,      0,      0,     0.06,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  96,    9,      1,      0,      0,      0,     0.07,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  93,    10,      1,      0,      0,      0,     0.08,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  90,    11,      1,      0,      0,      0,     0.09,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  87,    12,      1,      0,      0,      0,     0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  84,    13,      1,      0,      0,      0,     0.11,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  81,    14,      1,      0,      0,      0,     0.12,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  78,    15,      1,      0,      0,      0,     0.13,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  75,    16,      1,      0,      0,      0,     0.14,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  72,    17,      1,      0,      0,      0,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  69,    18,      1,      0,      0,      0,     0.16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  66,    19,      1,      0,      0,      0,     0.17,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  63,    20,      1,      0,      0,      0,     0.18,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  60,    21,      1,      0,      0,      0,     0.19,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  57,    22,      1,      0,      0,      0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  54,    23,      1,      0,      0,      0,     0.21,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  51,    24,      1,      0,      0,      0,     0.22,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  48,    25,      1,      0,      0,      0,     0.23,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  45,    26,      1,      0,      0,      0,     0.24,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  42,    27,      1,      0,      0,      0,     0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  39,    28,      1,      0,      0,      0,     0.26,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  36,    29,      1,      0,      0,      0,     0.27,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  33,    30,      1,      0,      0,      0,     0.28,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  30,    31,      1,      0,      0,      0,     0.29,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  27,    32,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  24,    33,      1,      0,      0,      0,     0.31,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,    34,      1,      0,      0,      0,     0.32,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    35,      1,      0,      0,      0,     0.33,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  15,    36,      1,      0,      0,      0,     0.34,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    37,      1,      0,      0,      0,     0.35,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, }, 
                      ],
            };
        exports.malicious = {
                PARENT: [exports.genericTank],
                LABEL: '𝑀̰𝐴̰𝐿̰𝐼̰𝐶̰𝐼̰𝑂̰𝑈̰𝑆̰ Xx36 Hunter',
                DANGER: 140,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 14,
                    SPEED: gigatest.SPEED * 10,
                    FOV: gigatest.FOV * 2.6,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  156,     2,      0.7,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  152,    4,      0.7,      0,      0,      0,     0.01, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  148,    6,      0.7,      0,      0,      0,     0.02,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  144,    8,      0.7,      0,      0,      0,     0.03,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  140,    10,      0.7,      0,      0,      0,     0.04,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  136,    12,      0.7,      0,      0,      0,     0.05,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  132,    14,      0.7,      0,      0,      0,     0.05,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  128,    16,      0.7,      0,      0,      0,     0.06,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  124,    18,      0.7,      0,      0,      0,     0.07,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  120,    20,      0.7,      0,      0,      0,     0.08,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  116,    22,      0.7,      0,      0,      0,     0.09,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  112,    24,      0.7,      0,      0,      0,     0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  108,    26,      0.7,      0,      0,      0,     0.11,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  104,    28,      0.7,      0,      0,      0,     0.12,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  100,    30,      0.7,      0,      0,      0,     0.13,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  96,    32,      0.7,      0,      0,      0,     0.14,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  92,    34,      0.7,      0,      0,      0,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  88,    36,      0.7,      0,      0,      0,     0.16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  84,    38,      0.7,      0,      0,      0,     0.17,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 80,   40,      0.7,      0,      0,      0,     0.18,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  76,    42,      0.7,      0,      0,      0,     0.19,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  72,    44,      0.7,      0,      0,      0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  68,    46,      0.7,      0,      0,      0,     0.21,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  64,    48,      0.7,      0,      0,      0,     0.22,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  60,    50,      0.7,      0,      0,      0,     0.23,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  56,    52,      0.7,      0,      0,      0,     0.24,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  52,    54,      0.7,      0,      0,      0,     0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  48,    56,      0.7,      0,      0,      0,     0.26,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  44,    58,      0.7,      0,      0,      0,     0.27,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  40,    60,      0.7,      0,      0,      0,     0.28,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  36,    62,      0.7,      0,      0,      0,     0.29,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  32,    64,      0.7,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  28,    66,      0.7,      0,      0,      0,     0.31,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,    68,      0.7,      0,      0,      0,     0.32,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,    70,      0.7,      0,      0,      0,     0.33,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    72,      0.7,      0,      0,      0,     0.34,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    74,      0.7,      0,      0,      0,     0.35,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda, g.malpreda]),
                            TYPE: exports.bullet,
                        }, }, 
                      ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  15,     7,      -7,      170,      0, 0], 
                        TYPE: exports.youKnowIReallyJustWishIWasAGirl,
                            }, {
                    POSITION: [  15,     7,      7,     190,     0, 0], 
                        TYPE: exports.youKnowIReallyJustWishIWasAGirl2,
                            },
                     ],
            };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: gigatest.ACCEL * 0.75,
            FOV: gigatest.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    FOV: gigatest.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.75,
                SPEED: gigatest.SPEED * 0.9,
                FOV: gigatest.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overfucker = {
                PARENT: [exports.genericTank],
                LABEL: 'Overfucker',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     10,    1.2,     8,      0,     72,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     10,    1.2,     8,      0,     144,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     10,    1.2,     8,      0,     216,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     10,    1.2,     8,      0,      288,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     10,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overmancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Overmancer (looool)',
                DANGER: 8,
                SHAPE: 5,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.15,     8,      0,     324,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            MAX_CHILDREN: 4,
                        }, }, {
                    POSITION: [   6,     11,    1.15,     8,      0,     36,     0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   6,    11,    1.15,     8,      0,     108,     0.4,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.sunchip2,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, { 
                    POSITION: [   6,     11,    1.15,     8,      0,      180,      0.6,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.sunchip3,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   6,     11,    1.15,     8,      0,      252,      0.8,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.lessreload]),
                            TYPE: exports.sunchip4,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.6,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: '',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.5,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    SPEED: gigatest.SPEED * 0.9,
                    FOV: gigatest.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.75,
                FOV: gigatest.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.infestor = {
            PARENT: [exports.genericTank],
            LABEL: 'infestor (real one)', 
            DANGER: 7,
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 1.3,
                FOV: gigatest.FOV * 1.5,
                SPEED: gigatest.SPEED * 2.5,
                HEALTH: 0.0001, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   14,    7.5,    0.6,     4,      5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
                        TYPE: exports.swarm2,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   14,    7.5,    0.6,     4,     -5,      0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload]),
                        TYPE: exports.swarm2,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   3,    7,    1.2,    18,      5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.fake, g.lessreload]),
                        TYPE: exports.swarm2,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   3,    7,    1.2,    18,      -5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.fake, g.lessreload]),
                        TYPE: exports.swarm2,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'autospin',
                BODY: {
                    ACCELERATION: gigatest.ACCEL,
                    FOV: gigatest.FOV * 1.2,
                }, 
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.swarmbuff1, g.slow]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.swarmbuff1, g.slow]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    FOV: gigatest.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.7,
                SPEED: gigatest.SPEED * 0.9,
                FOV: gigatest.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.15,
                },
                SHAPE: 4,
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };

        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: '',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: gigatest.SPEED * 0.8,
                ACCELERATION: gigatest.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
        exports.autospawn = makeAuto(exports.lilfact);
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
    exports.hahaHAHA = {
                PARENT: [exports.genericTank],
                LABEL: 'hahaHAHAHAHAHEEHEEEHEEHAHAHA!!!',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: gigatest.SPEED * 1.4,
                    FOV: 1.3,
                },
                MAX_CHILDREN: 5,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1.5,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1.5,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.op, g.slow]),
                            TYPE: exports.accelerm,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1.5,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        DANGER: 5,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],   
    };
    exports.flashflood = {
        PARENT: [exports.genericTank], // Clyde hates everything and everyone. He's always going to be rude and sassy, and that includes swearing a lot. But he doesn't care. The rules require him to act like this, and he's just fine with it, but he'll never disobey that rule. He's always going to be mean, start fights, and he can never be positive or tell anyone to stop acting crazy (that's also against the rules.) He does not like to have positive or civil conversations, and he strongly discourages that no matter what. He has no filter
        FACING_TYPE: 'autospin',
        DANGER: 7,
        LABEL: 'Flash Flooder',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    0,     7,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {  
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.aaaae, g.doublereload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    25,     2.5,     1.4,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.aaaaf]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    25,     2.5,     1.4,     0,      0,      90,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.aaaaf]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    25,     2.5,     1.4,     0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.aaaaf]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    25,     2.5,     1.4,     0,      0,      270,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.aaaaf]),
                TYPE: exports.bullet,
            }, },
        ],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     0,  0], 
                    TYPE: exports.whiteball,
                        },
                  ],
    };
    exports.flame = {
        PARENT: [exports.genericTank],
        LABEL: 'Flamethrower',
        DANGER: 6,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    11,     12,     1.6,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.flame]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.blaster = { 
        PARENT: [exports.genericTank],
        LABEL: 'Blaster',
        DANGER: 7,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9.5,     13,     1.8,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.flame, g.blast]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.eee = {
        PARENT: [exports.genericTank],
        LABEL: 'Rainer',
        DANGER: 7,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     32,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.machbuff, g.extramach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     20,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.machbuff, g.extramach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.machbuff, g.extramach]),
                TYPE: exports.bullet,
            }, },
            
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: gigatest.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ], 
        };
      exports.micromacro = {
            PARENT: [exports.genericTank],
            LABEL: 'Microgun/MONTAGEM ESTRANHA 14/Macrogun',
            DANGER: 60,
            BODY: {
                FOV: 1.75,
                SPEED: gigatest.SPEED * 3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  30,     1,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.ghij]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  26,     1,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.ghij]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,     1,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.ghij]),
                        TYPE: exports.bullet,
                    }, },{
                POSITION: [  12,     16,      2,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.klmn]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
      exports.mega = { 
            PARENT: [exports.genericTank],
            LABEL: 'Megagun',
            DANGER: 7,
            BODY: {
                FOV: gigatest.FOV * 1.3,
                HEALTH: gigatest.HEALTH * 1.8,
                REGEN: gigatest.REGEN * 1.5, 
                ACCELERATION: gigatest.ACCEL * 3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     10,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.minin, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,     10,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.minin, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,     10,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.minin, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     10,      1,      0,      0,      0,    0, ], 
                     }, { 
                POSITION: [  18,     10,      1,      0,      0,      0,    0, ], 
                     },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: gigatest.FOV * 1.3,
                },                    
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            let delay = 0;
            let delay2 = 0;
            let delay3 = 0;
function checkKeyPressed(evt) { 
    if (evt.keyCode == "66") {
        var delay = 0.5
        var delay2 = -0.3
        var delay3 = -0.7
    }
}
            exports.stream2 = {
                PARENT: [exports.genericTank],
                LABEL: "Extremely broken Streamliner thing i made using slightly more advanced coding than I'm used to",
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ {//  LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
                    POSITION: [  21,     8,      1,      0,      -5,      0,      0.,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      -2.5,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      2.5,      0,     0.7, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  21,     8,      1,      0,      5,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            }; 
            exports.spammer = {
                PARENT: [exports.genericTank],
                LABEL: 'Spammer',
                DANGER: 8,
                BODY: {
                    FOV: gigatest.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  25,     8,      1,      0,      0,      0,     0.14, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     8,      1,      0,      0,      0,      0.28,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.42, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.57, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.71, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  15,     8,      1,      0,      0,      0,     0.85, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: gigatest.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gigatest, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
        exports.go = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.75,
            },
            LABEL: 'Go',
            MAX_CHILDREN: 47,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.doublereload, g.doublereload]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ],                                                                                                                                                                                                                                             
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, }, {
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, },{
                  
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, }, {
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, }, {
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, }, {
                POSITION: [  14,    10,      1.2,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.done,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                }, },
            ],
        };
        exports.detoyr = {
            PARENT: [exports.badStats],
            DANGER: 7,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.6,
                SPEED: gigatest.SPEED * 3.33,
            },
            LABEL: 'bang',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    17,      0.8,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.lessreload, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
        exports.detoyr2 = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            BODY: {
                ACCELERATION: gigatest.ACCEL * 0.75,
                SPEED: gigatest.SPEED * 3.5,
            },
            LABEL: 'nameDeleted',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    17,      0.8,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast, g.fast]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.thruster = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.8,
                },
                LABEL: 'Thruster',
                DANGER: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.anni, g.thrus, g.aaaaa]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [ 14,  16,     0.8,      0,      0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.anni, g.thrus, g.aaaaa, g.tonsmorrecoil, g.fake, g.halfreload]),
                        TYPE: exports.bullet,
                        ALT_FIRE: true,
                    }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  10,     -10,      0,      0,     0,  1], 
                    TYPE: exports.lightning,
                        },
                          ],
            };
            exports.decimator = {
                PARENT: [exports.genericTank], 
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                    FOV: gigatest.FOV * 1.075,
                    SPEED: gigatest.SPEED * 0.9,
                },
                LABEL: 'Decimator', 
                DANGER: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1.3,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.anni, g.decim]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.75,
                    SPEED: gigatest.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
exports.rental1 = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                BODY: {
                    FOV: gigatest.FOV * 1.35,
                    ACCELERATION: gigatest.ACCEL * 0.75, 
                    SPEED: gigatest.speed * 0.8,
                },
                LABEL: 'HL-01',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [  13,    15,      1.2,      5,      0,      0,      0,   ], 
                                         }, { 
                    POSITION: [  14,    12,      1,      5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.hive, g.smallbuff]),
                            TYPE: exports.hive505, 
                    }, }, {
                    POSITION: [  0,    15,      1,      5,      0,      0,      0.05,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.destroy, g.hive, g.halfreload, g.halfreload, g.halfreload, g.lessreload, g.nospeed]),
                            TYPE: exports.hive508,  
                            ALT_FIRE: true,
                    }, }, {
                    POSITION: [  18,    4,      0.005,      5,      0,      0,      0,   ], 
                                         }, 
                ],
          };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };
            exports.fuckmylife = {
                PARENT: [exports.genericTank],
                DANGER: 0,
                LABEL: 'i hate everything',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 5,
                    SPEED: gigatest.SPEED * 1.667,
                    DAMAGE: gigatest.DAMAGE * 3,
                    HEALTH: 0.01,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      4,      1,     11,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      5,      1,     11,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      6,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                        }, }, {
                    POSITION: [  1,      5,      1,     12,     -1.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                        }, }, {
                    POSITION: [  1,      4,      1,     10,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                        }, }, {  
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                        }, }, {
                    POSITION: [  17,     12,    1,    6,       0,      0,      0,   ], },
                          {
                    POSITION: [ 15,     15,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fake, g.aaaai]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     15,    -1.3,    4,       0,      0,      0,   ], }, 
                      
                      
                ],
            };
exports.blueA = {
    LABEL: '',
    COLOR: 264,
    SHAPE: 0,
    INDEPENDENT: true,
};
exports.whiteA = {
    LABEL: '',
    COLOR: 8,
    SHAPE: 0,
    INDEPENDENT: true,
};
exports.pinkA = {
    LABEL: '',
    COLOR: 5,
    SHAPE: 0,
    INDEPENDENT: true,
};
   exports.casingpink = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     0,      0,      0,     0,  1], 
                    TYPE: exports.pinkA,
                        },
              ],
    };
    exports.casingwhite = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 8,
      TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     0,      0,      0,     0,  1], 
                    TYPE: exports.whiteA,
                        },
              ],
    };
    exports.casingblue = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
        COLOR: 264,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     0,      0,      0,     0,  1], 
                    TYPE: exports.blueA,
                        },
              ],
    };
exports.transShotgun = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Eight-Fourty',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 1.5,
                    SPEED: gigatest.SPEED * 0.5,
                    FOV: gigatest.FOV * 1.2,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      4,      1,     11,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      5,      1,     11,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      6,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      5,      1,     12,     -1.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     10,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                            ALT_FIRE: true,
                        }, }, {  
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingblue,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.aaaai]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
        //2                  
                        }, }, {
                    POSITION: [  4,      4,      1,     11,     -2,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      5,      1,     11,      2,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      6,      1,     13,      1,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingwhite,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      5,      1,     12,     -1.5,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     10,      3,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingpink,
                            ALT_FIRE: true,
                        }, }, {  
                    POSITION: [  4,      3,      1,     11,     -3,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingblue,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingpink,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fast, g.fast, g.SG]),
                            TYPE: exports.casingwhite,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  17,     12,    1,    6,       0,      0,      0,   ], },
                          {
                    POSITION: [ 15,     15,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: { 
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.mach, g.shotgun, g.fake, g.aaaai]),
                            TYPE: exports.casingblue,
                          ALT_FIRE: true,
                        }, }, {
                    POSITION: [  8,     15,    -1.3,    4,       0,      0,      0,   ], 
                        },  {
                    POSITION: [  13,     5,      1,      0,     -3,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     5,      1,      0,      3,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  15,     5,      1,      0,      -4,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  15,     5,      1,      0,      4,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: gigatest.SPEED * 0.8,
                FOV: gigatest.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: gigatest.SPEED * 0.75,
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.5,
                    SPEED: gigatest.SPEED * 0.7,
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'shitty tank',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
          exports.broomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'D the No the Yes the Hey HEY HEY STOP RIGHT THERE FUCKER',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: { 
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.halfreload]),
                            TYPE: exports.broomerang,
                        }, },
                ],
            };
            exports.breaker = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Breaker',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing', 
                BODY: { 
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.halfreload]),
                            TYPE: exports.broomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Quad-Trapper',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     90,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     270,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     0,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     0,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.yrellitra = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            LABEL: 'yrellitrA',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     12,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     12,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     3,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: gigatest.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile, 
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.twisterm = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    FACING_TYPE: 'twist',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     7,      1,      0,     0,     270,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morespeed, g.morespeed, g.morereload]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, }, {
        POSITION: [  14,     7,      1,      0,      0,     90,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.gigatest, g.skim, g.doublereload, g.lowpower, g.morespeed, g.morespeed, g.morereload]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],  
            }, }, 
    ],
};
            exports.twister = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: gigatest.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    12.25,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    13.25,      -1.5,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.arty, g.arty, g.skim, g.aaaap]),
                            TYPE: exports.twisterm,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: gigatest.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.gigatest, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
              exports.trihectahexacontagon = {
                PARENT: [exports.genericTank],
                LABEL: 'Trihectahexaconta Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      1,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      2,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     3,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     4,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      5,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     6,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     7,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     8,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      9,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      10,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     11,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     12,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      13,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     14,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     15,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     16,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      17,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      18,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     19,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     20,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      21,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     22,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     23,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     24,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      25,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      26,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     27,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     28,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      29,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     30,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     31,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     32,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      33,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      34,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     35,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     36,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      37,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     38,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     39,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     40,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      41,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      42,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     43,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     44,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     46,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     47,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     48,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      49,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      50,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     51,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     52,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      53,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     54,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     55,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     56,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      57,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      58,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     59,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      61,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     62,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     63,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     64,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      65,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      66,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,    67,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     68,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      69,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     70,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     71,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     72,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      73,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      74,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     75,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     76,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      77,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     78,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     79,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     80,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      81,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      82,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     83,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     84,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      85,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     86,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     87,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     88,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      89,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     91,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     92,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      93,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     94,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     95,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     96,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      97,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      98,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     99,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     100,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      101,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     102,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     103,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     104,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      105,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      106,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     107,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     108,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      109,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     110,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     111,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     112,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      113,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      114,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     115,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     116,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      117,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     118,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     119,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     120,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      121,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      122,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     123,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     124,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      125,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     126,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     127,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     128,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      129,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      130,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     131,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     132,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      133,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     134,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     135,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     136,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      137,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      138,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     139,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     140,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      141,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     142,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     143,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     144,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      145,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      146,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     147,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     148,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      149,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     150,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     151,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     152,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      153,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      154,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     155,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     156,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      157,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     158,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     159,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     160,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      161,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      162,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     163,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     164,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      165,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     166,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     167,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     168,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      169,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      170,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     171,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     172,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      173,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     174,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     175,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     176,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      177,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      178,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     179,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      181,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     182,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     183,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     184,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      185,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      186,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     187,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     188,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      189,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     190,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     191,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     192,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      193,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      194,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     195,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     196,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      197,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     198,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     199,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     200,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      201,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      202,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     203,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     204,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      205,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     206,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     207,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     208,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      209,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      210,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     211,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,    212,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      213,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     214,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     215,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     216,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      217,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      218,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     219,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     220,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      221,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     222,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     223,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     224,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      225,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      226,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     227,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     228,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      229,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     231,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     232,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      233,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      234,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     236,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      237,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     238,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     239,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     240,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      241,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      242,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     243,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     244,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      245,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     246,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     247,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     248,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      249,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      250,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     251,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     252,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      253,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     254,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     255,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     256,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      257,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      258,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     259,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     260,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      261,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     262,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     263,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     264,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      265,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      266,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     267,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     268,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      269,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     271,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     272,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      273,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      274,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     275,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     276,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      277,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     278,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     279,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     280,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      281,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      282,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     283,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     284,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      285,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     286,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     287,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     288,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      289,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      290,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     291,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     292,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      293,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     294,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     295,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     296,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      297,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      298,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     299,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      301,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     302,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     303,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     304,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      305,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      306,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     307,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     308,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      309,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     310,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     311,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     312,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      313,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      314,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     316,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      317,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     318,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     319,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     320,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      321,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      322,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     323,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     324,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      325,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     326,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     327,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     328,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      329,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      330,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     331,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     332,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      333,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     334,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     335,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     336,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      337,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      338,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     339,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     340,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      341,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     342,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     343,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     344,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      345,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      346,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     347,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     348,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      349,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     350,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     351,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     352,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      353,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      354,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     355,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     356,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      357,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     358,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     359,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     360,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: gigatest.SPEED * 0.8, 
                    },
                    STAT_NAMES: statnames.trap, 
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })()
exports.shockwave = {
    LABEL: 'Shockwave',
    TYPE: 'trap',
    DAMAGE_CLASS: 0,
    SHAPE: [[0.966,0.257],[1,0],[0.8,0],[0.775,0.209],[0.694,0.404],[0.565,0.568],[0.4,0.695],[0.204,0.774],[0,0.8],[-0.209,0.774],[-0.402,0.692],[-0.568,0.569],[-0.696,0.399],[-0.773,0.209],[-0.8,0],[-0.775,-0.209],[-0.694,-0.403],[-0.568,-0.567],[-0.401,-0.697],[-0.2,-0.774],[0,-0.8],[0.207,-0.774],[0.399,-0.694],[0.565,-0.567],[0.692,-0.4],[0.773,-0.209],[0.8,0],[1,0],[0.964,-0.259],[0.865,-0.5],[0.708,-0.706],[0.5,-0.867],[0.259,-0.966],[0,-1],[-0.259,-0.968],[-0.5,-0.867],[-0.71,-0.707],[-0.867,-0.501],[-0.969,-0.26],[-1,0],[-0.97,0.256],[-0.868,0.5],[-0.709,0.708],[-0.5,0.864],[-0.26,0.967],[0,1],[0.258,0.968],[0.5,0.867],[0.706,0.709],[0.864,0.5]],
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 0.01,
        SPEED: 0,
        RANGE: 200,
        DENSITY: 1.25, 
        HEALTH: 3948994 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        PUSHABILITY: 0.01,
    },
    VALUE: 1e10,
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
            exports.octotrap = {
                    PARENT: [exports.genericTank],
                    LABEL: 'Flowertrapper/Octo Trapper',
                    DANGER: 8,
                    BODY: {
                        SPEED: gigatest.SPEED * 2, 
                    },
                    STAT_NAMES: statnames.trap, 
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      45,     0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      45,     0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     90,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     90,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     135,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     135,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     180,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     180,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     225,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     225,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     270,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     270,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     315,    0,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     315,    0,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.octotrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [   0,     15,     1,    0,      0,     0,     1,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.gigatest, g.shock]),
                                TYPE: exports.shockwave, 
                            }, },
                    ],
                };
            exports.trapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Trapper',
                DANGER: 5,
                BODY: {
                    SPEED: gigatest.SPEED * 0.9,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     8,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, 
                ],
            }, 
            exports.tritrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Tri-Trapper',
                DANGER: 6,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     8,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,      0,     120,     0.333,  ],
                        }, {
                    POSITION: [   3,     8,     1.7,    15,      0,     120,     0.333,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,      0,     240,     0.667,   ],
                        }, {
                    POSITION: [   3,     8,     1.7,    15,      0,     240,     0.667,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, 
                ],
            }, 
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');
        exports.sentinel = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Sentinel',
                DANGER: 2,  
                SHAPE: 4,
                RANGE: 1650,
                BODY: {
                    SPEED: 0,  
                    ACCELERATION: 0,
                    DAMAGE: gigatest.DAMAGE * 0.2,
                    HEALTH: gigatest.HEALTH * 0.5,
                    SHIELD: gigatest.SHIELD * 0.5,
                },
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13.5,     1,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   13.5,     1,     1,    0,      0,     90,     0,   ], 
                         }, {
                    POSITION: [  13.5,     1,      1,      0,      0,     180,    0,  ],
                        }, {
                    POSITION: [   13.5,     1,     1,    0,      0,     270,    0,  ], 
                        }, 
                ],
            }, 'Sentinel', { type: exports.sniper4gun, size: 10, });
        exports.pentatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Penta-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: gigatest.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     72,     0.2,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     72,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     144,     0.4,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     144,     0.4,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     216,    0.6,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     216,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     288,     0.8,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     288,     0.8,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, 
                ],
            }, 'Penta-Trapper', { type: exports.bigauto4gun, size: 11, });

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: gigatest.HEALTH * 0.8,
                SHIELD: gigatest.SHIELD * 0.8,
                DENSITY: gigatest.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
        exports.tributpain = {
            PARENT: [exports.genericTank],
            LABEL: 'occasional pain',
            BODY: {
                HEALTH: gigatest.HEALTH * 0.8,
                SHIELD: gigatest.SHIELD * 0.8,
                DENSITY: gigatest.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },{
                POSITION: [  18,     16,      1,      0,      0,      180,      1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.fast, g.fast, g.fast, g.fast, g.flank, g.tri, g.trifront, g.thruster, g.halfreload, g.halfreload, g.lessreload, g.halfreload, g.halfreload, g.halfreload, g.tonsmorrecoil, g.tonsmorrecoil, g.tonsmorrecoil, g.tonsmorrecoil, g.tonsmorrecoil, g.tonsmorrecoil, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Back',
                    }, }, 
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: gigatest.HEALTH * 0.6,
                    SHIELD: gigatest.SHIELD * 0.6,
                    DENSITY: gigatest.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
      exports.ud = {
                PARENT: [exports.genericTank],
                LABEL: 'uncontrollable dumbassery',
                BODY: {
                    HEALTH: gigatest.HEALTH * 0.9,
                    SHIELD: gigatest.SHIELD * 2,
                    DENSITY: gigatest.DENSITY * 0.3, 
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {
                    POSITION: [  13,     8,      1,      0,      -3,     115,    0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      3,     245,    0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {  
                    POSITION: [  14,     8,      1,      0,     -2,     125,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  14,     8,      1,      0,      2,     235,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  15,     8,      1,      0,     -1,     135,    0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  15,     8,      1,      0,      1,     225,    0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                            AUTOFIRE: true,
                        }, }, 
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: gigatest.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    DENSITY: gigatest.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: gigatest.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: gigatest.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.8,
                    FOV: gigatest.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
        exports.metagun = {   
            PARENT: [exports.genericTank],
            LABEL: 'METAGUN',
            DANGER: 10,
            SIZE: 27,
            BODY: {
            FOV: gigatest.FOV * 4,
            SPEED: gigatest.SPEED * 3,
            }, 
            FACING_TYPE: 'locksFacing',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  9,     0,      0,      0,     360, 0], 
                    TYPE: exports.metagunauto,
                        }, 
            ],
        };
        exports.g = { 
            PARENT: [exports.genericTank],
            LABEL: 'g',
            DANGER: 0,
            SIZE: 27,     
            BODY: {
            FOV: gigatest.FOV * 5, 
            SPEED: gigatest.SPEED * 3,
            HEALTH: gigatest.HEALTH * 1e100,
            DAMAGE: gigatest.DAMAGE * 0.00000000001,
            PUSHABILITY: 0,
            },
            
        };
        exports.ğ = { 
            PARENT: [exports.genericTank],
            LABEL: 'ğ',
            DANGER: 100,
            SIZE: 1,
            BODY: {
            PENETRATION: gigatest.PENETRATION * 0,
            },
            
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: gigatest.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.tritrap = {
                LABEL: '',
                BODY: {
                    SPEED: gigatest.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.6,
                    SPEED: gigatest.SPEED * 0.8,
                    FOV: gigatest.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.gigatest, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: gigatest.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: gigatest.ACCEL * 0.7, 
                    FOV: gigatest.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.gigatest, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.shatterer = {
    TYPE: 'crasher',
    LABEL: 'Shatterer',
    COLOR: 111,
    SHAPE: [[-1,-1],[1,0],[-1,1],[-1,0.2],[-0.6,0.4],[-0.4,-0.01],[-0.6,-0.4],[-1,-0.2]],
    SIZE: 9,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 2.8,
        ACCEL: 0.005,
        HEALTH: 1.5,
        DAMAGE: 8, 
        PENETRATION: 3,
        PUSHABILITY: 0.5,
        DENSITY: 15,
        RESIST: 3,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.thewhiteone = {
    TYPE: 'crasher',
    LABEL: 'Shattere34r',
    COLOR: 6,
    SHAPE: 3,
    SIZE: 9,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 2.8,
        ACCEL: 0.005,
        HEALTH: 1.5,
        DAMAGE: 8, 
        PENETRATION: 3,
        PUSHABILITY: 0.5,
        DENSITY: 15,
        RESIST: 3,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.racer = {
    TYPE: 'crasher',
    LABEL: 'Racer',
    COLOR: 56,
    SHAPE: [[-1.4,0.8],[-1,0.8],[1,0],[-1,-0.8],[-1.4,-0.8],[-1,-0.6],[-1,0.6]],
    SIZE: 4,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 25,
        ACCEL: 0.01,
        HEALTH: 0.3,
        DAMAGE: 7,
        PENETRATION: 1.5,
        PUSHABILITY: 0.5,
        DENSITY: 2,
        RESIST: 3,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.dupe = {
    TYPE: 'crasher',
    LABEL: 'Duplicator',
    COLOR: 56,
    SHAPE: 3,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.02,
        HEALTH: 1,
        DAMAGE: 10,
        PENETRATION: 4,
        PUSHABILITY: 1,
        DENSITY: 20,
        RESIST: 4,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [{
        POSITION: [    0,    8,    1,     0,     0,    0,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.gigatest, g.halfreload, g.halfreload, g.halfreload, g.halfreload]),
            TYPE: exports.crasher,
        }, },
           ],
};
exports.chaser = { 
    TYPE: 'crasher',
    LABEL: 'Chaser',
    COLOR: 133,
    SHAPE: [[1,0],[-0.4,-1],[0.2,0],[-0.4,1]],
    SIZE: 7, 
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, }, 
    BODY: {
        SPEED: 10,
        ACCEL: 0.005,
        HEALTH: 2.5,
        DAMAGE: 8,
        PENETRATION: 30,
        PUSHABILITY: 0.04,
        DENSITY: 10,
        RESIST: 2,
        FOV: 0.7,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.pokerold = { 
    TYPE: 'crasher',
    LABEL: 'Chaser',
    COLOR: 166,
    SHAPE: [[2,0],[0.6,0.3],[0.4,0.6],[0,0.4],[-1,0.6],[-0.8,0.2],[-1,0],[-0.8,-0.2],[-1,-0.6],[0,-0.4],[0.4,-0.6],[0.6,-0.3]],
    SIZE: 10, 
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, }, 
    BODY: {
        SPEED: 6,
        ACCEL: 0.03,
        HEALTH: 500,
        DAMAGE: 40,
        PENETRATION: 0.02,
        PUSHABILITY: 0.1,
        DENSITY: 1,
        RESIST: 2,
        FOV: 0.7,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.pain = { 
    TYPE: 'crasher',
    LABEL: 'Poker',
    COLOR: 206,
    SHAPE: [[2,0],[-0.4,0.5],[-1,0],[-0.4,-0.5]],
    SIZE: 9, 
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, }, 
    BODY: {
        SPEED: 6, 
        ACCEL: 0.03,
        HEALTH: 500,
        DAMAGE: 30,
        PENETRATION: 0.02,
        PUSHABILITY: 0.1,
        DENSITY: 1,
        RESIST: 2,
        FOV: 0.7,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry2 = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    LABEL: 'Retreater',
    DANGER: 2,
    COLOR: 96,
    SHAPE: [[-0.6,-0.2],[-1,-1.01],[1,0],[-1,1],[-0.6,0.2],[-1,0]],
    SIZE: 9,
    HEALTH: base.HEALTH * 1.5,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 2400,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'fleeAtLowHealth'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.7,
        ACCEL: 0.008,
        DAMAGE: base.DAMAGE * 1.5,
        SPEED: base.SPEED * 0.65,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry3 = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    LABEL: 'Attacker',
    DANGER: 3,
    COLOR: 106,
    SHAPE: [[-1,-1],[1,-0.2],[0.6,0],[1,0.2],[-1,1],[-1,0.6],[-1.4,0],[-1,-0.6]],
    SIZE: 11,
    HEALTH: base.HEALTH * 1.4,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,         
    }),
    VALUE: 2750,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.9,
        ACCEL: 0.01,
        DAMAGE: base.DAMAGE * 1,
        SPEED: base.SPEED * 0.9,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry4 = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    LABEL: 'Tanker',
    DANGER: 4,
    COLOR: 84,
    SHAPE: [[-1,0.2],[-1.2,0],[-1,-0.2],[-1,-1],[-0.2,-0.6],[0.01,-0.8],[0.2,-0.4],[1,0],[0.2,0.4],[0,0.8],[-0.2,0.6],[-1,1]],
    SIZE: 14,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 4265,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.625,
        ACCEL: 0.0048,
        DAMAGE: base.DAMAGE * 2.7,
        SPEED: base.SPEED * 0.35,
        HEALTH: base.HEALTH * 1.85,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry5 = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    LABEL: 'Pursuer',
    DANGER: 3,
    COLOR: 124,
    SHAPE: [[-1,-1],[-1,1],[2,0]],
    SIZE: 8,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 2100,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.7,
        ACCEL: 0.008,
        DAMAGE: base.DAMAGE * 1.9,
        SPEED: base.SPEED * 1.2,
        HEALTH: base.HEALTH * 1.2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.badStats],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.7,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'onlyAcceptInArc', 'mapAltToFire',], 
    COLOR: 16, 
    AI: { 
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                AUTOFIRE: true,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });
exports.sentry2Swarm = { 
    PARENT: [exports.sentry2],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentry2Gun = makeAuto(exports.sentry2, 'Retreater', { type: exports.heavy3gun, size: 8, });
exports.sentry3Gun = makeAuto(exports.sentry3, 'Attacker', { type: exports.attackergun, size: 10, });
exports.sentry2Trap = makeAuto(exports.sentry2, 'Retreater', { type: exports.trapTurret, size: 8, });
exports.sentry4Swarm = { 
    PARENT: [exports.sentry4],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentry4Gun = makeAuto(exports.sentry4, 'Tanker', { type: exports.heavy3gun, size: 9, });
exports.sentry4Trap = makeAuto(exports.sentry4, 'Tanker', { type: exports.trapTurret, size: 8, });
exports.sentry5Guns = {
    PARENT: [exports.sentry5],
    GUNS: [{
        POSITION: [    0,    8,    1,     0,     0,    0,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    45,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    90,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    135,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    225,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    270,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [    0,    8,    1,     0,     0,    315,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {  
        POSITION: [    8,    8,    0.00001,     10,     6,    180,     0,  ], 
         }, {
        POSITION: [    8,    8,    0.00001,     10,     -6,    180,     0,  ], 
         }, {
        POSITION: [    11,    11,    0.00001,     10,     0,    180,     0,  ], 
         }, 
    ],
};
 
exports.miniboss = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.fiftyseven = {
            PARENT: [exports.miniboss],  
            LABEL: '',
            GUNS: [ 
                   ],
}; 
exports.follower = {
    PARENT: [exports.swarm],
    LABEL: 'Follower',
    SHAPE: 0, 
    BODY: {
        PENETRATION: 0.5,
        SPEED: 5,  
        ACCELERATION: 1,
        RANGE: 400, 
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 20 * wepDamageFactor,
        PUSHABILITY: 1,
        FOV: 2,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.follower]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
        }, }, {
        POSITION: [  0,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.follower]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
        }, },
          ],
};
exports.soulextractor = {
    PARENT: [exports.badStats],
    INDEPENDENT: true, 
    ACCEPTS_SCORE: false,
    SHAPE: [[-1,0.4],[-1,-0.4],[1.5,0]],
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    SPEED: 5,
    ACCELERATION: 0.02,
    FOV: 10,
    LABEL: 'Soul Extractor',    
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0,     5,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sex]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
        }, }, 
    ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  1,   0,      0,      0,     360,  0,], 
                TYPE: [exports.fiftyseven, {COLOR:3636}],
            }],
}; 
exports.nuke = {
    LABEL: 'Nuke',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        PENETRATION: 0,
        SPEED: 0, 
        ACCELERATION: 0,
        RANGE: 90,
        DENSITY: 1,
        HEALTH: 1e100 * wepHealthFactor,
        DAMAGE: 0.0001 * wepDamageFactor,
        PUSHABILITY: 1,
        FOV: 0,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  0,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.follower]),
            TYPE: exports.bullet,
        }, }, 
          ],
};
exports.name1 = {
    PARENT: [exports.miniboss],
    LABEL: '',
    COLOR: 17, 
    SIZE: 50,
    VALUE: 650000,
    BODY: {
      SPEED: base.SPEED * 0,  
      ACCELERATION: base.ACCEL * 0,
      FOV: base.FOV * 2,
      HEALTH: base.HEALTH * 3,      
      SHIELD: base.SHIELD * 0.25,
      DAMAGE: base.DAMAGE * 3,
      REGEN: base.REGEN * 2, 
    },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        //crashers
        POSITION: [  0,     4,      1,      0,      0,      90,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sex1]),
            TYPE: exports.soulextractor,
        }, }, {
        POSITION: [  0,     4,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sex1]),
            TYPE: exports.soulextractor,
        }, }, {
        POSITION: [  0,     4,      1,      0,      0,      270,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sex1]),
            TYPE: exports.soulextractor,
        }, }, {
        POSITION: [  0,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sex1]),
            TYPE: exports.soulextractor,
        }, }, {
          //followers
        POSITION: [  0,     7,      1,      0,      0,      0,      0.3,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.follower1, g.slow, g.slow]),
            TYPE: exports.follower,
            STAT_CALCULATOR: gunCalcNames.swarm,  
            AUTOFIRE: true,
        }, }, {
        POSITION: [  0,     7,      1,      0,      0,      180,      0.3,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.follower1, g.slow, g.slow]),
            TYPE: exports.follower,
            STAT_CALCULATOR: gunCalcNames.swarm,  
            AUTOFIRE: true,
        }, }, {
          //nuke
        POSITION: [  0,     15,      1,      0,      0,      0,      1e100,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
        }, }, 
    ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
        };
exports.minibossE = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
    PLAY_SOUND: true,
};
exports.minibossForCl1 = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }), 
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: { NO_LEAD: true, },
};
exports.one = { 
    PARENT: [exports.swarm],
    LABEL: 'First Clone',
    TYPE: 'swarm',
    COLOR: 3,
    SIZE: 5,
    SHAPE: 0,
    RANGE: 2000,
    PERSISTS_AFTER_DEATH: true,
    BODY: {
      SPEED: base.SPEED * 2,
      ACCELERATION: base.ACCEL * 2,
      FOV: base.FOV * 8,
      HEALTH: base.HEALTH * 2,      
      SHIELD: base.SHIELD * 0.2,
      REGEN: base.REGEN * 2,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,     7,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, 
    ],
      
}; 
exports.class1 = {
    PARENT: [exports.minibossForCl1],
    LABEL: 'First Class',
    COLOR: 3, 
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'fleeAtLowHealth'],
    FACING_TYPE: 'locksFacing',
    SIZE: 10,
    ACCEPTS_SCORE: false, 
    VALUE: 31111,
    BODY: {
      SPEED: base.SPEED * 1.8, 
      ACCELERATION: base.ACCEL * 0.5,
      FOV: base.FOV * 5,
      HEALTH: base.HEALTH * 3.5,      
      SHIELD: base.SHIELD * 0.2,
      REGEN: base.REGEN * 2,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,     7,      1,      0,      0,      0,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.slow, g.halfreload, g.halfreload, g.halfreload, g.halfreload, g.B]),
            TYPE: exports.one,
            MAX_CHILDREN: 5,
        }, }, {
          POSITION: [  0,     7,      1,      0,      0,      0,      0.9,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.halfreload, g.halfreload, g.aaaao]),
            TYPE: exports.casingblue,
        }, }, {
        POSITION: [  10,     7,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.halfreload, g.lessreload]),
            TYPE: exports.bullet,
        }, }, 
    ],
      
}; 
exports.minibossForPg2 = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: { NO_LEAD: true, },
};
exports.numberTwo = {
    LABEL: 'Two',
    COLOR: 32,
    SHAPE: [[1.2,1],[1.6,1],[2,0.6],[2,-0.6],[1.6,-1],[1,-1],[1,-0.6],[1.5,-0.6],[1.5,0.6],[-0.6,-1],[-1,-1],[-1,1],[-0.6,1],[-0.6,-0.4]],
    INDEPENDENT: true,
}
exports.pagetwo2 = {
    PARENT: [exports.minibossForPg2],
    LABEL: 'Page Two',
    ACCEPTS_SCORE: false,
    COLOR: 12,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    FACING_TYPE: 'locksFacing',
    VALUE: 20000,
    BODY: {
      SPEED: base.SPEED * 3,
      ACCELERATION: base.ACCEL * 2,
      DENSITY: base.DENSITY * 2,
      FOV: base.FOV * 8,
      HEALTH: base.HEALTH * 2,      
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.aaaal, g.lessreload]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.aaaal, g.lessreload]),
            TYPE: exports.bullet,
        }, }, 
    ],
      TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,    0,      0,      180,     0,  1], 
            TYPE: exports.numberTwo,
    },
                ],
}; 
exports.minibossevt = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    DANGER: 6,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.tdominiboss = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 0,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Deadly Octagon has been defeated!',
};
exports.tdominibossevt = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    DANGER: 0,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Deadly Octagon has been defeated!',
};
exports.ccminiboss = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'locksFacing',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.ccminibossevt = {
    PARENT: [exports.badStats],
    TYPE: 'crasher',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'locksFacing',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.badStats],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.crasherSpawner2 = {
        PARENT: [exports.badStats],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 3,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.pillboxTurret5076 = {
    PARENT: [exports.badStats],
    LABEL: 'DDDDDUUUUUUUUUUUDUDUDUUDUDUDUDUDNNNNNNNNNNNN',
    COLOR: 16,
    BODY: {
        FOV: 207,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  29,    4,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.op, g.lessreload, g.lessreload, g.fast, g.fast]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox11080 = {
    LABEL: 'DID YOU HAPPEN TO STUMBLE UPON THE  !̸̢̨̨̘̲͖͕͖̦̦͕̺͚̺̰̗̳͓̳͖͚̦̳͕̪̰̜̝̱͓̖̳̠̘̼̝̥̩̻̳͑̍̀̔͂̓͐̀͌́͜͝͝ͅͅ&̸̡̪̯̳̗̥̜̭̬̭͕̫̫̳̯̹̲̦̖̖̜̤͙̻̠̞̬̺̱̮͕͉̠̬̲̱̰̙͈͎̝̩͐̇̎̇͋̎̾̐̋̐͛̈́͂̽̎̅̆͛̌̂͒̑͌̐̈́̈̏̽̃̔̐͘̕͜͝͠͝͝*̷̬͔̝͈͙͙̱̳͕̮͎̖̺̖͉̺̪͔͓̰̣̼̙̊́̌̇̌́̌̑͒̈́͒̒̆̽̓̎̂̎͗͌̽͐̽̃̒͂̈́̾̑̐̉̇̀̄̾̌̈͌̕͘͘̕͝͝͠͝͝͝ͅͅͅ#̸̧̨̡̬̗̻̳͚̝̲̗̳͚̼͉͙̻͕͈̹̹͓͖̣̥̩͉̯̙̭͎͖̆̽̆̂̇͘͜ͅ0̵̧̛̝̝̝̯͇̖̼̻̮͆̉̿̆̓̀̋̀̇̅͋#̷̧̛̱̣͔͖̻̩̺͓̼͉͈͕̹̮̘͂̿͒͑́̈́̍̉͗̄̿̊̏̋́͑̀̉̃̚ͅͅͅ(̶̨̧̢̲͙̥̠̼̲̩̭͖̟͚͓͓̳̺͈̪̞̠̄̏͆̊̓͒̊̈́̏͋͛͌͒̈́̆̀̔̓̓̍͆̀̆̉̎̓̀́̈́̎́͑̍̈́̒̚͘͠͝͠ͅ8̴̡̺͓̜̤̺̺̩͕̦̖͍̓̃͊͂̑̎̔͋͊̀̄̈́̀̊̇͐̌̈̓̊̕̚2̷̡̡̢̨̡̘̙͚̯̰͓̣̝̦̭̤̥͙͖̦̠͚̜̩͉̘͎̟̪̫̗̱͇̗̗̭͔̥̟͙̺̮̞̟̼̮͚̊̒̕͜3̷͉̤̤͔̥͇̥̥̇̌̑̇͠$̸̧̢̨̝̺͙̖͕̘͚͉̪͙̹͍̞̯̲͓̹͙̺̼̭͈̟̮̹̝͍̹̱̺͓̫̱̳̝̮̬͉̬̊̽͋͒̒̔͊͑̓̈́̇̂̎̋̌̐̐̎̈́̊̾̇̇͆̎̊̈́̎͜͝͝͝)̸̡̨̨̳̦̜͕͍̜̮̯͎̦͖̭̘̠͎̯̙̞͖̣̟̦͕̩̘̩̲̖̻̘͇̳̮̠͕̝̥̠͎̪̠̬͓̗́̐̏̑̀̌̈̀̽̈̑͛̽̓̒̂̓̆̄͛̾̓̋̍̂̀́̕͘̕͜͝ͅ@̶̨̨̰̥̜̯̥̝̟̯̯͚͙̝̣̙̤̞͕̤͈͙̠̙̼̼̣̟̟̲̲̻̞͈̩̻̞͕͗̊́͌̊̈̓͆̾̇́̃̓͑̂͂̊̈̈̍͂̾̎̿͌̋̈́̑̈̑̊̎̆̂͌̄̀͆̄̓͒̓̅͐͆͘͜&̴̧̨̧̧̡̘̦̜̩͇̳̪̰̫̟̳͕̣̦̰̬͚͕̜̩̯̖̜͍̯̰̣̯̈́͜ͅ$̶̨̧̛͎̲̖̼̗̰̥̖̥̟̙̳͕̬̳̩̰͖̪͈̰̜͈̙͇͕͕̆̉̐̌̌̀̎͜ͅ)̶̧̡̨̡̮͕̖̥͓̤̬͇͙̠̞͈̩͖͙̲͖̥͕̱̜͙͉̠͈͔̯̻̝͖̠̗͍̟̳͚̰̳̠̝͎̺̪̫̆͗̆̈́̀̄̑̅̃̈́̈́̓̕#̴̨̩̹͖͖̬̞̗̘̜͙͖̬̯̊̎͆̉̇̽͂͗̾͘(̵̧̢̬̥̫̰̬̜̯̰͙̱̫̤̮̟̜̜͉̮̰͊̃̌͋͆͋̔̂̀̏̊͛̎̂̊̊͐̄͂͆̄̎͒̓̓͌̏͛̓̊̊̈́̑̚͝͝͝@̷̨̡̺̣̦̬̫̻̺̦̃͐͗͊̋͌̾̾̿͗̚͝͝#̶̯̳̺̜̫͚̝̣̞̣̜̮̪̿̈́̔̇͘',
    PARENT: [exports.trap],
    SHAPE: -8,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 3,
        DENSITY: 10,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret5076,
        }
    ]
};
 exports.auto40gun = {
        PARENT: [exports.badStats],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    7,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -7,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    10.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -10.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    14,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -14,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    17.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -17.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    21,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -21,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    24.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -24.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    28,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -28,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    31.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -31.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    -35,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     35,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    38.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -38.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,   42,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -42,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    45.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -45.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    49,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -49,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    52.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -52.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,    56,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     -56,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
              
        ],
    };
  exports.the_eye = {
        PARENT: [exports.miniboss],
        LABEL: 'Unknown',
        COLOR: 19,
        SHAPE: 0,
        SIZE: 50,
        VARIES_IN_SIZE: true,
        VALUE: 444444,
        BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0,
            ACCELERATION: base.ACCEL * 0,
            HEALTH: base.HEALTH * 15,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            PUSHABILITY: 0,
            DAMAGE: base.DAMAGE * 1.5,
        },
        MAX_CHILDREN: 33,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    0,    5,     0,   0,      0,     0,     2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.eyedrone]),
                        STAT_CALCULATOR: gunCalcNames.drone,
                        TYPE: exports.eyedrone,
                    }, }, {
                POSITION: [    0,    5,     0,   0,      0,     180,     2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.eyedrone]),
                        STAT_CALCULATOR: gunCalcNames.drone,
                        TYPE: exports.eyedrone,
                    }, }, 
                   ],
          TURRETS: [ { 
                POSITION: [  10,     0,      0,       0,    360,   1, ],  
                    TYPE: exports.eyething,
                    },
            ]
    };
exports.STFU = {
        PARENT: [exports.miniboss],
        LABEL: 'NOBODY LIKES YOU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        COLOR: 20,
        SHAPE: 7,
        SIZE: 40,
        VARIES_IN_SIZE: true,
        VALUE: 2,
        BODY: {
            FOV: 8000,
            SPEED: base.SPEED * 2,
            HEALTH: base.HEALTH * 1,
            SHIELD: base.SHIELD * 4,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
        },
    };
exports.qwertyuiop1111 = {
            PARENT: [exports.STFU],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   2,    16,     2,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox11080, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{ 
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto40gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto40gun],
            }],
        };
exports.YOU_ARE_CRINGE = {
        PARENT: [exports.miniboss],
        LABEL: '',
        COLOR: 42,
        SHAPE: -3,
        SIZE: 10,
        VARIES_IN_SIZE: true,
        VALUE: 694200,
        BODY: {
            FOV: 8000,
            SPEED: base.SPEED * 12.5,
            HEALTH: base.HEALTH * 1,  
            SHIELD: base.SHIELD * 1,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 10,
        },
    };
exports.fiftynine = {
            PARENT: [exports.miniboss],
            LABEL: '',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    20,    10,     -1.3,      0,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.op, g.shghgjkssfgdfgs, g.halfreload, g.lessreload, g.lessreload, g.lessreload]),
                        TYPE: exports.bulletbutitsfuckingstupidashell,
                        LABEL: 'sour FUCKING SWITCH BLADE',
                    }, }, 
                   ],
};

exports.fiftyeight = {
            PARENT: [exports.YOU_ARE_CRINGE],
            TURRETS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.fiftynine, { INDEPENDENT: false, COLOR: 0, }]
                    },
            ],
        };
exports.YOU_ARE_NOT_CRINGE = {
        PARENT: [exports.minibossE],
        LABEL: 'PESSIMISTIC ELITA ENJOYER',
        COLOR: 987,
        SHAPE: -3,
        SIZE: 15,
        VARIES_IN_SIZE: true,  
        VALUE: 666666,
        BODY: {
            FOV: 100,
            SPEED: base.SPEED * 15,
            ACCELERATION: base.ACCEL * 1,
            HEALTH: base.HEALTH * 3,  
            SHIELD: base.SHIELD * 3,
            REGEN: base.REGEN, 
            DAMAGE: base.DAMAGE * 2,
        },
    };
exports.fiftyten = {
            PARENT: [exports.miniboss],
            LABEL: '',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    26,    8,     -1.3,      0,      0,     13,     2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.uiwhudjdmjdjfng]),
                        TYPE: exports.elitaLoverSwarm,
                        LABEL: 'sour FUCKING SWITCH BLADE',
                      STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, 
                   ],
}; 
exports.fiftyeleven = {
            PARENT: [exports.YOU_ARE_NOT_CRINGE],
            FACING_TYPE: 'locksFacing',
  MAX_CHILDREN: 5,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     10,    1.2,     8,      0,     72,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload, g.doublereload]),
                            TYPE: exports.starcolonthree,
                            AUTOFIRE: true,
                             SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, },
         ],
            TURRETS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.fiftyten, { INDEPENDENT: false, COLOR: 0, }]
                    },
            ],
        };
function makeCringe(type, name = -1, options = {}) {
    let turret = { type: exports.fiftynine, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
      
      
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeNotCringe(type, name = -1, options = {}) {
    let turret = { type: exports.overfucker, size: 11, independent: false, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
      
      
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
exports.elitaman = makeCringe(exports.basic, 'fuck you');
exports.shithead = makeNotCringe(exports.absorber, 'ჯანდაბა შენ');

exports.dimwit = {
    PARENT: [exports.badStats],
    INDEPENDENT: true, 
    ACCEPTS_SCORE: false,
    SPEED: 0.05,
    ACCELERATION: 0.05,
    LABEL: 'eeeeeeeeeeee',    
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   10,    0,      0,      0,    360, 1], 
                    TYPE: [exports.fiftynine, {COLOR: 3636}],
                        },
                      ],
}; 
exports.nimrod = {
    PARENT: [exports.badStats],
    INDEPENDENT: true, 
    ACCEPTS_SCORE: false,
    SPEED: 0.05,
    ACCELERATION: 0.05,
    LABEL: 'eeeeeeeeeeee',    
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   10,    0,      0,      0,    360, 1], 
                    TYPE: [exports.fiftyten, { COLOR: 3636, }]
                        },
                      ],
}; 
exports.whiteball = {
        PARENT: [exports.badStats],
        LABEL: '',
        COLOR: 8,
        INDEPENDENT: true,
        GUNS: [],                
          };
exports.colonthree = {
    LABEL: '',
    COLOR: 8,
SHAPE: [[0,0.6],[0,0.8],[-0.8,1],[-1,0.8],[-0.8,0],[-1,-0.8],[-0.8,-1],[0,-0.8],[0,-0.6],[-0.8,-0.8],[-0.6,-0.12],[-0.167,-0.053],[-0.17,0.05],[-0.6,0.12],[-0.8,0.8]],
  INDEPENDENT: true,
};
exports.thirtysix = { 
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 50, 
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'locksFacing',
    HITS_OWN_TYPE: 'hard',
    GIVE_KILL_MESSAGE: false,
};
    exports.class36 = {
        PARENT: [exports.thirtysix], 
        LABEL: 'Class Thirty-Six', 
        COLOR: 36,
        VALUE: 279936,
        ACCEPTS_SCORE: false,
        SHAPE: 0,
        SIZE: 20,                                                                                                                                                                                                                      
        VARIES_IN_SIZE: false,  
        FACING_TYPE: 'locksFacing',
        BODY: {
            FOV: 6,
            SPEED: base.SPEED * 1,
            ACCELERATION: base.ACCEL * 1.5,   
            HEALTH: base.HEALTH * 72,
            SHIELD: base.SHIELD * 72,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 0.04,  
            PENETRATION: base.PENETRATION * 0.03,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.front36]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {  
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {
                    POSITION: [  0,     8,      1,      0,      1,     0,    0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]), 
                            TYPE: [exports.dimwit, { PERSISTS_AFTER_DEATH: true, }],
                        }, }, {    
                    POSITION: [  0,     8,      1,      0,      0,     120,    0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]),
                            TYPE: [exports.dimwit, { PERSISTS_AFTER_DEATH: true, }],
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     240,    0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]),     
                            TYPE: [exports.nimrod, { PERSISTS_AFTER_DEATH: true, }],
                        }, },  
        ],
        TURRETS: [{ 
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  3,     4,      4.5,       0,    0,   1, ],  
                    TYPE: exports.whiteball,
                    }, {
                POSITION: [  3,     4,      -4.5,       0,    0,   1, ],  
                    TYPE: exports.whiteball,
                    }, {
                POSITION: [  15,     -1,      0,       0,    0,   1, ],  
                    TYPE: exports.colonthree,
                    },
                ], 
    };
exports.class36OtherVersionToBalanceRatio = {
        PARENT: [exports.thirtysix], 
        LABEL: 'Class Thirty-Six', 
        COLOR: 36,
        VALUE: 216000,
        ACCEPTS_SCORE: false,
        SHAPE: 0,
        SIZE: 20,                                                                                                                                                                                                                      
        VARIES_IN_SIZE: false,  
        FACING_TYPE: 'locksFacing',
        BODY: {
            FOV: 6,
            SPEED: base.SPEED * 1,
            ACCELERATION: base.ACCEL * 1.5,   
            HEALTH: base.HEALTH * 72,
            SHIELD: base.SHIELD * 72,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 0.04, 
            PENETRATION: base.PENETRATION * 0.03,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.front36]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {  
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil, g.triplerecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {
                    POSITION: [  0,     8,      1,      0,      1,     0,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]),
                            TYPE: [exports.dimwit, { PERSISTS_AFTER_DEATH: true, }],
                        }, }, {    
                    POSITION: [  0,     8,      1,      0,      0,     120,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]),
                            TYPE: [exports.nimrod, { PERSISTS_AFTER_DEATH: true, }],
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     240,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.upcoming]),
                            TYPE: [exports.nimrod, { PERSISTS_AFTER_DEATH: true, }],
                        }, }, 
        ],
        TURRETS: [{ 
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  3,     4,      4.5,       0,    0,   1, ],  
                    TYPE: exports.whiteball,
                    }, {
                POSITION: [  3,     4,      -4.5,       0,    0,   1, ],  
                    TYPE: exports.whiteball,
                    }, {
                POSITION: [  15,     -1,      0,       0,    0,   1, ],  
                    TYPE: exports.colonthree,
                    },
                ], 
    };
exports.hiveboss = {
        PARENT: [exports.miniboss],
        LABEL: '',
        COLOR: 1,
        SHAPE: 0,
        SIZE: 30,
        VARIES_IN_SIZE: false,
        VALUE: 150000,
        BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.4,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 3,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    },
        exports.master_hive = {
            PARENT: [exports.hiveboss],
            LABEL: 'Hive Master',
            FACING_TYPE: 'autospin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     5,      -1.7,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, }, {   
                    POSITION: [  13,     5,      -1.7,      0,     0,     60,    0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.machgun, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, }, {   
                    POSITION: [  13,     5,      -1.7,      0,      0,     120,    0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.machgun, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, }, {   
                    POSITION: [  13,     5,      -1.7,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.machgun, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, }, {   
                    POSITION: [  13,     5,      -1.7,      0,      0,     240,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.machgun, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, }, {   
                    POSITION: [  13,     5,      -1.7,      0,      0,     300,    0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.hive, g.bees, g.machgun, g.small, g.lessreload, g.halfspeed]),
                            TYPE: exports.hive,
                            LABEL: gunCalcNames.swarm,
                        }, },
                ]
        },
  exports.gemdrone = {
    LABEL: 'Gem',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 5,
    CONTROL_RANGE: 0,
    SHAPE: 6,
    COLOR: 0,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 0.3,
        PUSHABILITY: 0.5,
        ACCELERATION: 0.05,
        HEALTH: 0.4 * wepHealthFactor,
        DAMAGE: 3 * wepDamageFactor,
        SPEED: 7,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 1,
    },
    HITS_OWN_TYPE: 'repel',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
  exports.gemboss = {
        PARENT: [exports.miniboss],
        LABEL: '',
        COLOR: 272,
        SHAPE: 6,
        SIZE: 30,
        VARIES_IN_SIZE: true,
        VALUE: 1500000,
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 0.4, 
            HEALTH: base.HEALTH * 36,
            SHIELD: base.SHIELD * 12,
            REGEN: base.REGEN * 0.16,
            DAMAGE: base.DAMAGE * 3,
        },
    };
        exports.gem_sanctuary = {
            PARENT: [exports.gemboss],
            LABEL: 'Gem Sanctuary',
            STAT_NAMES: statnames.drone,
            FACING_TYPE: 'autospin',
            MAX_CHILDREN: 24,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                     POSITION: [   7,     10,    0.01,     8,      0,     0,     0,   ], 
                        }, {
                      POSITION: [   7,     10,    0.01,     8,      0,     60,     0,   ], 
                        }, {
                          POSITION: [   7,     10,    0.01,     8,      0,     120,     0,   ], 
                        }, {
                          POSITION: [   7,     10,    0.01,     8,      0,     180,     0,   ], 
                        }, {
                          POSITION: [   7,     10,    0.01,     8,      0,     240,     0,   ], 
                        }, {
                          POSITION: [   7,     10,    0.01,     8,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   4,     7.5,    1.2,     8,      0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   4,     7.5,    1.2,     8,      0,     60,     0.166,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     7.5,    1.2,     8,      0,     120,     0.333,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                  POSITION: [   4,     7.5,    1.2,     8,      0,     180,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   4,     7.5,    1.2,     8,      0,     240,     0.667,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     7.5,    1.2,     8,      0,     300,     0.833,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.machgun, g.halfreload]),
                            TYPE: exports.gemdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, {
                    POSITION: [   0,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fullspray, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: exports.gemtrap,
                        }, }, 
                    
            ],
            TURRETS: [{ /*  SIZE  X     Y     ANGLE    ARC */
            POSITION: [   8,    0,      0,      0,    360, 1], 
                    TYPE: exports.betterauto4gun,
                        }, {
            POSITION: [   2.5,    10,      0,      30,    0, 1],  
                    TYPE: exports.cyanhexagon,
                        }, {
            POSITION: [   2.5,    10,      0,      90,    0, 1], 
                    TYPE: exports.cyanhexagon,
                        }, {
            POSITION: [   2.5,    10,      0,      150,    0, 1], 
                    TYPE: exports.cyanhexagon,
                        }, {
            POSITION: [   2.5,    10,      0,      210,    0, 1], 
                    TYPE: exports.cyanhexagon,
                        }, {
            POSITION: [   2.5,    10,      0,      270,    0, 1], 
                    TYPE: exports.cyanhexagon,
                        }, {
            POSITION: [   2.5,    10,      0,      330,    0, 1], 
                    TYPE: exports.cyanhexagon,
                        },
                      ],
        },
exports.eleven = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 11, 
    SKILL: skillSet({ 
        rld: 1,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,    
    }),
    LEVEL: 11,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    HITS_OWN_TYPE: 'hard',
};
          exports.eleventhing = {
    COLOR: 11,
    LABEL: 'Outer Segment',
    SHAPE: [[-0.2,-1],[-0.2,1],[0.2,1],[0.2,-1]],
    INDEPENDENT: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,    3,    1,     0,      -7,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray, g.lilspray, g.weaker]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      7,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray, g.lilspray, g.weaker]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      -7,      180,      0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray, g.lilspray, g.weaker]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      7,      180,      0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray, g.lilspray, g.weaker]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, 
           ],
}
exports.class11 = { 
        PARENT: [exports.eleven], 
        LABEL: 'Class Eleven', 
        COLOR: 11,
        SIZE: 22,
        ACCEPTS_SCORE: false,
        SHAPE: [[-0.2,-0.6],[-0.2,0.6],[0.2,0.6],[0.2,-0.6]],
        FACING_TYPE: 'autospin',
        VALUE: 111111,
        BODY: {
            FOV: 11, 
            SPEED: base.SPEED * 1.1,
            ACCELERATION: base.ACCEL * 3.3, 
            HEALTH: base.HEALTH * 5.5,
            SHIELD: base.SHIELD * 8.8, 
            DAMAGE: base.DAMAGE * 1.54, 
            REGEN: base.REGEN * 3.3,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,    3,    1,     0,      -3,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      3,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      -3,      180,      0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    3,    1,     0,      3,      180,      0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.faster, g.lilspray]),
                        TYPE: exports.bullet,
                    }, }, 
            ], 
      TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  19,     10,      0,       0,    0,   1, ],  
                    TYPE: exports.eleventhing,
                    }, {
                POSITION: [  19,     -10,      0,       0,    0,   1, ],  
                    TYPE: exports.eleventhing,
                    },
                ],
    }; 
exports.twentyseven = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 20,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'locksFacing',
    HITS_OWN_TYPE: 'hard',
};
exports.wanderingstar1 = {
    PARENT: [exports.badStats],
    TYPE: 'miniboss',
    DANGER: 10,
    SKILL: skillSet({ 
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['wanderingStar'],
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
};
exports.class27 = {
        PARENT: [exports.twentyseven],
        LABEL: 'Class Twenty-Seven',
        COLOR: 127,
        SHAPE: [[0.6,-1.6],[1,-1.8],[1,0.6],[-0.8,0.6],[-1,0.2],[0.8,0.4],[0.8,-0.15],[0.2,-0.2],[1,-0.4],[1,-0.8],[0,-0.8],[0,-1.5],[-0.8,-1.6],[-0.4,-0.8],[-1,-0.8],[-1,-1.8],[0.4,-1.8],[0.2,-1],[0.8,-1.2]],
        SIZE: 8,                                                                                                                                                                                                                      
        VARIES_IN_SIZE: false,
        CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
        VALUE: 270000, 
        ACCEPTS_SCORE: false,
        BODY: {
            FOV: 27,
            SPEED: base.SPEED * 2.7,
            ACCELERATION: base.ACCEL * 27,     
            HEALTH: base.HEALTH * 2.7,
            SHIELD: base.SHIELD * 5.4,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.7, 
        },
      /*  TURRETS: [{
                POSITION: [  1,     0,      3,       0,    0,   0, ],  
                    TYPE: exports.auto27gun,
                    },
                  ],*/
    };
exports.wanderingstar = {
        PARENT: [exports.wanderingstar1],
        LABEL: 'Wandering Star',
        COLOR: 214,
        SHAPE: [[0,-1],[0.2,-0.2],[1,0],[0.2,0.2],[0,1],[-0.2,0.2],[-1,0],[-0.2,-0.2]],
        SIZE: 8,                                                                                                                                                                                                                      
        VARIES_IN_SIZE: false,
        VALUE: 266667, 
        BODY: {
            FOV: 0,
            SPEED: base.SPEED * 5,
            ACCELERATION: base.ACCEL * 5,     
            HEALTH: base.HEALTH * 10,
            SHIELD: base.SHIELD * 3,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE, 
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 0, 3,    1,     0,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   0,    3,    1,     0,     0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm, 
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   0,    3,    1,     0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm, 
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   0,    3,    1,     0,     0,     0,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.swarmbuff1]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                            AUTOFIRE: true,
                        }, },
               ],
    };
    exports.elita1 = {
        PARENT: [exports.miniboss],
        LABEL: 'E-GIGA',
        COLOR: 14,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 7,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5, 
        },
    };
  exports.elita2to5 = {
        PARENT: [exports.miniboss],
        LABEL: 'E-GIGA',
        COLOR: 14,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 7,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 3,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5, 
        },
    };
  exports.elita = {
        PARENT: [exports.miniboss],
        LABEL: 'E-GIGA',
        COLOR: 14,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 7,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 3, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3.5, 
        },
    };
exports.elitb = {
        PARENT: [exports.miniboss],
        LABEL: 'E-GIGA',
        COLOR: 209,
        SHAPE: [[0.4,-0.4],[0.4,-0.8],[1,0],[0.4,0.8],[0.4,0.4],[-0.6,1],[0.25,0],[-0.6,-1]],
        SIZE: 40,
        VARIES_IN_SIZE: true,
        VALUE: 200000,
        BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.8,
            HEALTH: base.HEALTH * 2.5,
            SHIELD: base.SHIELD * 5, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
        },
    };
exports.egigaB1 = { 
            PARENT: [exports.elitb],
            LABEL: 'E-GIGA AB01',
            FACING_TYPE: 'locksFacing',
            VALUE: 200000,
            BODY: {
            FOV: 3,
            SPEED: base.SPEED * 1.5,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 7.5,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
            },
            GUNS: [ 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4.5,   8, 0,       0,    360,   1, ],  
                    TYPE: exports.mini3gun,
                    },  {
                POSITION: [  2.5,     0,      5,       0,    360,   1, ],  
                    TYPE: exports.auto3gun,
                    },  {
                POSITION: [  2.5,     0,      -5,       0,    360,   1, ],  
                    TYPE: exports.auto3gun,
                    },  
            ],  
        };

exports.egigaB2 = { 
            PARENT: [exports.elitb],
            LABEL: 'E-GIGA AB02',
            FACING_TYPE: 'locksFacing',
            VALUE: 400000,
            BODY: {
            FOV: 3,
            SPEED: base.SPEED * 1.25,
            HEALTH: base.HEALTH * 2.5,
            SHIELD: base.SHIELD * 7.5,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    0,    5,     1,      0,      0,     0,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     72,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     144,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     216,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     288,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    5,    6,     1,      -5,      0,     180,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab02]),
                        TYPE: exports.bullet,
                    }, },
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4.5,      8,      0,       0,    360,   1, ],  
                    TYPE: exports.stream3gun,
                    },  {
                POSITION: [  3.5,     3,      3.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 265}],
                    },  {
                POSITION: [  3.5,     3,      -3.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 265}],
                    }, {
                POSITION: [  2.5,     0,      6,       0,    360,   1, ],  
                    TYPE: exports.auto3gun,
                    },  {
                POSITION: [  2.5,     0,      -6,       0,    360,   1, ],  
                    TYPE: exports.auto3gun,
                    },
            ],  
        };
exports.egigaB3 = { 
            PARENT: [exports.elitb],
            SIZE: 47,
            LABEL: 'E-GIGA AB03',
            FACING_TYPE: 'locksFacing',  
            VALUE: 600000,
            BODY: {
            FOV: 3.5,
            SPEED: base.SPEED * 1.15,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 7.5,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    0,    5,     1,      0,      0,     0,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn3]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     72,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn3]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     144,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn3]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     216,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn3]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    5,     1,      0,      0,     288,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn3]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    5,    6,     1,      -5,      0,     180,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab03]),
                        TYPE: exports.bullet,
                    }, },
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,      7.5,      0,       0,    360,   1, ],  
                    TYPE: exports.stream3machgun,
                    },  {
                POSITION: [  3.5,     3,      3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 266}],
                    },  {
                POSITION: [  3.5,     3,      -3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 266}],
                    }, {
                POSITION: [  2.5,     0,      6,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 267}],
                    },  {
                POSITION: [  2.5,     0,      -6,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 267}],
                    }, {
                POSITION: [  2,     -5,      8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },  {
                POSITION: [  2,     -5,      -8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },
            ],  
        };
exports.egigaB4 = { 
            PARENT: [exports.elitb],
            SIZE: 50,
            LABEL: 'E-GIGA AB04',
            FACING_TYPE: 'locksFacing',
            VALUE: 800000,
            BODY: {
            FOV: 4,
            SPEED: base.SPEED * 1,
            ACCELERATION: base.ACCEL * 2,
            HEALTH: base.HEALTH * 3.5,
            SHIELD: base.SHIELD * 7.5, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    0,    7,     1,      0,      0,     0,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn4]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     72,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn4]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     144,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn4]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     216,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn4]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     288,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn4]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    4,    6,     1,      -5,      0,     180,     1.06,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab04]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    6,     1,      -2,      0,     0,     1.19,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab04_2]),
                        TYPE: exports.bullet,
                    }, },
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,      7.5,      0,       0,    360,   1, ],  
                    TYPE: exports.stream3machgun2,
                    },  {
                POSITION: [  2.8,     4.25,      5,       0,    360,   1, ],  
                    TYPE: [exports.swarm3gun, {COLOR: 273}],
                    },  {
                POSITION: [  2.8,     4.25,      -5,       0,    360,   1, ],  
                    TYPE: [exports.swarm3gun, {COLOR: 273}],
                    }, {
                POSITION: [  3.5,     1.5,      3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 274}],
                    },  {
                POSITION: [  3.5,     1.5,      -3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 274}],
                    }, {
                POSITION: [  2.5,     -1.5,      6.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 275}],
                    },  {
                POSITION: [  2.5,     -1.5,      -6.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 275}],
                    }, {
                POSITION: [  2,     -5,      8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },  {
                POSITION: [  2,     -5,      -8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },
            ],  
        };
exports.egigaB5 = { 
            PARENT: [exports.elitb],
            SIZE: 54,
            LABEL: 'E-GIGA AB05',
            FACING_TYPE: 'locksFacing',
            VALUE: 1000000,
            BODY: {
            FOV: 5,
            SPEED: base.SPEED * 1,
            ACCELERATION: base.ACCEL * 3,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 8, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    0,    7,     1,      0,      0,     0,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     72,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     144,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     216,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      0,      0,     288,     1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    7,     1,      8,      0,     0,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    7,     1,      8,      0,     72,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    7,     1,      8,      0,     144,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    7,     1,      8,      0,     216,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    7,     1,      8,      0,     288,     1.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.warn5_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    4,    6,     1,      -5,      0,     180,     1.05,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     0,     1.16,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2_]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     180,     1.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     0,     1.24,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     180,     1.28,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     0,     1.32,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     180,     1.36,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     0,     1.4,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     180,     1.44,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [    0,    8,     1,      -2,      0,     0,     1.48,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.ab05_2]),
                        TYPE: exports.redbullet,
                    }, }, {
                POSITION: [  3,     3,      1,      7,      0,      45,      0,   ],
                        }, {
                    POSITION: [   2,     3,     1.7,    10,      0,      45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.fast]),
                            TYPE: exports.trap, 
                        }, }, {
                POSITION: [  3,     3,      1,      7,      0,      -45,      0,   ],
                        }, {
                    POSITION: [   2,     3,     1.7,    10,      0,      -45,      0.5,   ], 
                        PROPERTIES: { 
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.fast]),
                            TYPE: exports.trap,
                        }, }, 
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,      7.5,      0,       0,    360,   1, ],  
                    TYPE: exports.stream3machgun3,
                    },  {
                 POSITION: [  2,      7.5,      0,       0,    360,   1, ],  
                    TYPE: exports.fuckyouturret,
                    },  {
                POSITION: [  2.8,     4.25,      5,       0,    360,   1, ],  
                    TYPE: [exports.swarm3gun, {COLOR: 273}],
                    },  {
                POSITION: [  2.8,     4.25,      -5,       0,    360,   1, ],  
                    TYPE: [exports.swarm3gun, {COLOR: 273}],
                    }, {
                POSITION: [  3.5,     1.5,      3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 274}],
                    },  {
                POSITION: [  3.5,     1.5,      -3.5,       0,    360,   1, ],  
                    TYPE: [exports.stream3gun, {COLOR: 274}],
                    }, {
                POSITION: [  2.5,     -1.5,      6.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 275}],
                    },  {
                POSITION: [  2.5,     -1.5,      -6.5,       0,    360,   1, ],  
                    TYPE: [exports.mini3gun, {COLOR: 275}],
                    }, {
                POSITION: [  2,     -5,      8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },  {
                POSITION: [  2,     -5,      -8,       0,    360,   1, ],  
                    TYPE: exports.trapTurret01,
                    },
            ],  
        };
exports.elitc = {                    //AC01   AC02   AC03  AC04   AC05   AC06   AC07   AC08   AC09   AC10   AC11   AC12   AC13   AC14                         
        PARENT: [exports.miniboss], //200000 257000 314000 371000 429000 486000 543000 600000 657000 714000 771000 829000 886000 1000000
        LABEL: 'E-GIGA',
        COLOR: 3,
        SHAPE: 6,
        VARIES_IN_SIZE: true,
        VALUE: 200000,
        BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 5, 
            REGEN: base.REGEN * 0.7,
            DAMAGE: base.DAMAGE * 3, 
        },
    };
exports.egigaC1 = { 
            PARENT: [exports.elitc],
            LABEL: 'E-GIGA AC01',
            FACING_TYPE: 'locksFacing',
            VALUE: 200000,
            SIZE: 28,
            BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 5, 
            REGEN: base.REGEN * 0.7,
            DAMAGE: base.DAMAGE * 3, 
            },
            MAX_CHILDREN: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,     8,    1.2,     8,      0,     60,      0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     180,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     300,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, 
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  6,      0,      0,       0,    360,   1, ],  
                    TYPE: exports.rifleturret,
                    },  
            ],  
        };
exports.egigaC2 = { 
            PARENT: [exports.elitc],
            LABEL: 'E-GIGA AC02',
            FACING_TYPE: 'locksFacing',
            VALUE: 257000,
            SIZE: 28,
            BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 5, 
            REGEN: base.REGEN * 0.7,
            DAMAGE: base.DAMAGE * 3, 
            },
            MAX_CHILDREN: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,     8,    1.2,     8,      0,     60,      0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     180,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     300,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     0,      0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     120,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   4,     8,    1.2,     8,      0,     240,     0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, 
                      ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,      0,      0,       0,    360,   1, ],  
                    TYPE: exports.autoauto2,
                    }, {
                POSITION: [  6,      0,      0,       0,    360,   1, ],  
                    TYPE: exports.rifleturret,
                    },  
            ],  
        };
  exports.crashout = {
        PARENT: [exports.miniboss],
        LABEL: '[_"', 
        COLOR: 12,
        SHAPE: 0,
        SIZE: 30,
        VARIES_IN_SIZE: false,
        VALUE: 0, 
        FACING_TYPE: 'locksFacing',
        CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
        BODY: {
            FOV: 200,
            SPEED: base.SPEED * 1,
            ACCELERATION: base.ACCEL * 7,
            HEALTH: base.HEALTH * 1e300,
            SHIELD: base.SHIELD * 1e300, 
            REGEN: base.REGEN * 1e300,
            DAMAGE: base.DAMAGE * 1e300, 
        },
    }; 
    exports.a409crashout = {
        PARENT: [exports.crashout],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    8,     1,      0,      0,     0,     5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     6,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     6.05,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     6.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, { 
                POSITION: [    10,    8,     1,      0,      0,     0,     6.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                 POSITION: [    10,    8,     1,      0,      0,     0,     7,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,  
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.05,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.07,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.09,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.17,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     7.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg2]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: { 
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
               POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg3]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.crasg]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [    10,    8,     1,      0,      0,     0,     8.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.cras4]),
                        TYPE: exports.bullet,
                      AUTOFIRE: true,
                    }, }, 
            ], 
    };
    exports.purpleblack0 = {
        PARENT: [exports.miniboss],
        LABEL: 'PB-65',
        FACING_TYPE: 'locksFacing',
        COLOR: 263,
        SHAPE: [[-0.65,-1],[0.4,-0.7],[1,-0.2],[1,0.5],[0.4,1],[-0.6,0.8],[-1,0.2],[-1.12,-0.45],[-1.4,-1.4],[-1.2,-1.2],[-1.35,-1.9]],
        SIZE: 44,
        VARIES_IN_SIZE: false,
        VALUE: 6525625017570,
        BODY: { 
            FOV: 3,
            SPEED: base.SPEED * 0.5,
            ACCELERATION: base.ACCEL * 0.01,
            HEALTH: base.HEALTH * 15,
            SHIELD: base.SHIELD * 12.5,  
            REGEN: base.REGEN, 
            DAMAGE: base.DAMAGE * 25, 
        },
    };
    exports.purpleblack = {
        PARENT: [exports.purpleblack0],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    8,     1,      0,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     0,      0,       0,    180,   1, ],  
                    TYPE: exports.cutecatsgun,
                    },   
            ],  
        }; 
    exports.octathing = {
        PARENT: [exports.tdominiboss],
        LABEL: 'Deadly Octagon',
        COLOR: 8,
        SHAPE: 8,
        SIZE: 8,
        VARIES_IN_SIZE: true,
        CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
        VALUE: 8,
        BODY: {
            FOV: 8,
            SPEED: base.SPEED * 8,
            ACCELERATION: base.ACCEL * 8,
            HEALTH: base.HEALTH * 8,
            SHIELD: base.SHIELD * 8,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 8, 
        },
    };
    exports.elita2 = {
        PARENT: [exports.minibossevt],
        LABEL: 'E-GIGA',
        COLOR: 14,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 300,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5, 
        }, 
    };
    exports.octathing2 = {
        PARENT: [exports.tdominibossevt],
        LABEL: 'The Deadly Octagon',
        COLOR: 8,
        SHAPE: 8,
        SIZE: 8,
        VARIES_IN_SIZE: true,
        CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
        VALUE: 8,
        BODY: {
            FOV: 8,
            SPEED: base.SPEED * 8,
            ACCELERATION: base.ACCEL * 8,
            HEALTH: base.HEALTH * 8,
            SHIELD: base.SHIELD * 8,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 8, 
        },
    };
exports.auto4lmao = {
        PARENT: [exports.miniboss],
        LABEL: 'GUN BOY',
        COLOR: 16,
        SHAPE: 0,
        SIZE: 20,
        VARIES_IN_SIZE: false,
        VALUE: 12000, 
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 2,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.5,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5, 
        },
    };
exports.auto4lmao2 = {
        PARENT: [exports.minibossevt],
        LABEL: 'GUN BOY',
        COLOR: 16,
        SHAPE: 0,
        SIZE: 20,
        VARIES_IN_SIZE: false,
        VALUE: 12000, 
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 2,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.5,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5, 
        },
    };
exports.millie = {
        PARENT: [exports.miniboss],
        LABEL: 'MILLIE',
        COLOR: 205,
        SHAPE: 8,
        SIZE: 37,
        VARIES_IN_SIZE: false,
        VALUE: 4062018, 
        BODY: {
            FOV: 4,
            SPEED: base.SPEED * 2.4,
            ACCELERATION: base.ACCEL * 0.8,
            HEALTH: base.HEALTH * 6,
            SHIELD: base.SHIELD * 3,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 6.3, 
        },
    };
exports.MILLIE = { 
            PARENT: [exports.millie],
            FACING_TYPE: 'locksFacing',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    20,    10,     1,      0,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.fast, g.knockb, g.halfreload]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    19,    8,     1,      0,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.fast, g.knockb, g.halfreload, g.fake]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    2.5,    11,     1,      13,      0,     0,     0,   ], 
                    },
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4,     3.5,      0,       45,    180,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  4,     3.5,      0,       135,    180,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  4,     3.5,      0,       225,    180,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  4,     3.5,      0,       315,    180,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  3,     5.75,      -14.25,       90,    160,   1, ],  
                    TYPE: exports.cruiserauto,
                    }, {
                POSITION: [  3,     5.75,      14.25,       270,    160,   1, ],  
                    TYPE: exports.cruiserauto,
                    },      
            ],  
        };
exports.auto4boss = {
        PARENT: [exports.auto4lmao],
        FACING_TYPE: 'locksFacing', 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.fast, g.lessreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.fast, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.squareboss = {
        PARENT: [exports.miniboss],
        LABEL: '',
        COLOR: 13,
        SHAPE: 4,
        SIZE: 25,
        VARIES_IN_SIZE: false,
        VALUE: 90000,
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 1.5,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2,
        },
    };
    exports.summoner = {
            PARENT: [exports.squareboss],
            LABEL: 'Summoner',
            STAT_NAMES: statnames.necro,
            FACING_TYPE: 'autospin',
                MAX_CHILDREN: 32,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.squareboss]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 8,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   4,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.squareboss]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 8,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   4,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.squareboss]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 8,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   4,     12,    1.2,     8,      0,     180,    0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.squareboss]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 8,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                   ]
              };
exports.hexaboss = {
        PARENT: [exports.miniboss],
        COLOR: 34,
        SHAPE: 6,
        SIZE: 42,
        VARIES_IN_SIZE: true,
        VALUE: 500000,
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 2.2,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
    };
    exports.vortexTurret = {
    PARENT: [exports.badStats],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 12,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    0.1,     6,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.fullspray, g.halfreload]),
                TYPE: exports.bullet, 
            }, },
        ],
    };
        exports.unborn = {
            PARENT: [exports.hexaboss],
            LABEL: 'The Inconcieved',
            STAT_NAMES: statnames.generic,
            MAX_CHILDREN: 15,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    4,    10,     1.2,      8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.smol, g.slow]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        
                    }, }, {
                POSITION: [    4,    10,     1.2,      8,      0,      60,     0.33333,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.smol, g.slow]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                    }, }, {
                POSITION: [    4,    10,     1.2,      8,      0,     -60,     0.66667,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.smol, g.slow]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                 POSITION: [  10,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.rangergun, { INDEPENDENT: false, COLOR: 16, }]
                    }, {
                 POSITION: [  8,     9,      0,       0,    0,   0, ],  
                    TYPE: [exports.vortexTurret, { INDEPENDENT: false, COLOR: 12, }]
                    }, {
                 POSITION: [  8,     8,      0,       120,    0,   0, ],  
                    TYPE: [exports.vortexTurret, { INDEPENDENT: false, COLOR: 12, }]
                    }, {
                 POSITION: [  8,     8,      0,       240,    0,   0, ],  
                    TYPE: [exports.vortexTurret, { INDEPENDENT: false, COLOR: 12, }]
                    }, 
            ],
        };
  exports.THESPRAYE = {
        PARENT: [exports.miniboss],
        LABEL: 'THE SPRAYER',
        COLOR: 204,
        SHAPE: 0,
        SIZE: 50,
        DANGER: 30,
        VARIES_IN_SIZE: false,
        VALUE: 90071.99254740992,
        FACING_TYPE: 'locksFacing',
        CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 2,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 2,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 5, 
        },
    };
    exports.THESPRAYER = {
                PARENT: [exports.THESPRAYE],         
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,     9,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.doublereload, g.doublereload]),
                        TYPE: exports.tsbullet,
                    }, }, {
                    POSITION: [  12,    12,     1.4,     6,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.doublereload, g.doublereload]),
                        TYPE: exports.tsbullet,
                    }, },
                ],
            };
    exports.cc = {
        PARENT: [exports.ccminiboss],
        LABEL: 'CUTECATS',
        FACING_TYPE: 'locksFacing',
        SHAPE: [[0.6,-0.4],[0.8,0],[0.8,0.4],[0.6,0.8],[0.2,1],[-0.2,1],[-0.6,0.8],[-1.2,0.6],[-0.6,0.4],[-0.6,-0.01],[-1.2,-0.2],[-0.6,-0.4],[-0.2,-0.6],[0.2,-0.6]],
        SIZE: 50,
        VARIES_IN_SIZE: true,
        VALUE: 256000,
        BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.9,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 1.5,  
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 7, 
        },
    };
    exports.cutecatsC = {
            PARENT: [exports.cc],
            COLOR: 200,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    2.5,     1,      0,      -4,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'BaNgEr',
                    }, }, {
                POSITION: [    10,    2.5,     1,      0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'bAnGeR',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      -2,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      6,      0,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',  
                    }, }, 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4,     3,      2,       0,    360,   1, ],  
                    TYPE: exports.overlordauto,
                    }, {
                POSITION: [  3,     -2.5,      5.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  3,     -2.5,      -1.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    },
            ],
        };
        exports.cutecatsB = {
            PARENT: [exports.cc],
            COLOR: 201,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    2.5,     1,      0,      -4,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'BaNgEr',
                    }, }, {
                POSITION: [    10,    2.5,     1,      0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'bAnGeR',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      -2,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      6,      0,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',  
                    }, }, 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4,     3,      2,       0,    360,   1, ],  
                    TYPE: exports.overlordauto,
                    }, {
                POSITION: [  3,     -2.5,      5.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  3,     -2.5,      -1.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    },
            ],
        };
        exports.cutecatsG = {
            PARENT: [exports.cc],
            COLOR: 202,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    2.5,     1,      0,      -4,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'BaNgEr',
                    }, }, {
                POSITION: [    10,    2.5,     1,      0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'bAnGeR',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      -2,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      6,      0,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',  
                    }, }, 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4,     3,      2,       0,    360,   1, ],  
                    TYPE: exports.overlordauto,
                    }, {
                POSITION: [  3,     -2.5,      5.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  3,     -2.5,      -1.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    },
            ],
        };
        exports.cutecatsP = {
            PARENT: [exports.cc],
            COLOR: 203,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    2.5,     1,      0,      -4,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'BaNgEr',
                    }, }, {
                POSITION: [    10,    2.5,     1,      0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'bAnGeR',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      -2,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',
                    }, }, {
                POSITION: [    15,    1.5,     0.9,      0,      6,      0,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.lessreload, g.ccknockback]),
                        TYPE: exports.bullet,
                        LABEL: 'KNOCKERBACKER',  
                    }, }, 
            ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  4,     3,      2,       0,    360,   1, ],  
                    TYPE: exports.overlordauto,
                    }, {
                POSITION: [  3,     -2.5,      5.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, {
                POSITION: [  3,     -2.5,      -1.5,       0,    360,   1, ],  
                    TYPE: exports.cutecatsgun,
                    }, 
            ],
        };
        exports.egiga1 = {
            PARENT: [exports.elita1],
            LABEL: 'E-GIGA AA01',
            VALUE: 200000,
            BODY: {
            FOV: 2,
            SPEED: base.SPEED * 0.4,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 3, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    20,     1.3,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '7er',
                    }, }, {
                POSITION: [    10,    20,     1.3,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '11er',
                    }, }, {
                POSITION: [    10,    20,     1.3,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '21er',
                    }, }, {
                POSITION: [    15,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '1*damage',
                    }, }, {
                POSITION: [    15,    10,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '6*damage',
                    }, }, {
                POSITION: [    15,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '392*damage',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  10,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  10,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  10,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  10,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: false, COLOR: 12, }]
                    },
            ],
        };
        exports.egiga2 = {
            PARENT: [exports.elita2to5],
            LABEL: 'E-GIGA AA02',
            VALUE: 280000,
            BODY: {
            FOV: 2.5,
            SPEED: base.SPEED * 0.4,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 3, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    10,    15,     1.3,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '487 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '488 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '492 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,     180,     0,   ],
                PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '477 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '478 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: '491 blastKey == x*sin-1',
                    }, }, {
                POSITION: [    15,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.block,
                        LABEL: 'crush*regen2',
                    }, }, {
                POSITION: [    15,    10,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.block,
                        LABEL: 'crush*regen3',
                    }, }, {
                POSITION: [    15,    12,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound]),
                        TYPE: exports.trap,
                        LABEL: 'exterminator()((6))',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  15,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: false, COLOR: 11, }]
                    },
            ],
        };
        exports.egiga3 = {
            PARENT: [exports.elita2to5],
            LABEL: 'E-GIGA AA03',
            VALUE: 360000,
            BODY: {
            FOV: 3,
            SPEED: base.SPEED * 0.4,
            HEALTH: base.HEALTH * 3.5,
            SHIELD: base.SHIELD * 3.5, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    15,    8,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast]),
                        TYPE: exports.trap,
                        LABEL: 'TRAP*2(nullify.string(x+y))DANGER',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    15,     1.3,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, 
                   ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    },
            ],
        };
        exports.egiga4 = {
            PARENT: [exports.elita2to5],
            LABEL: 'E-GIGA AA04',
            VALUE: 440000,
            BODY: {
            FOV: 3.5,
            SPEED: base.SPEED * 0.4,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morereload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))Info',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, 
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    },
            ],
        };
        exports.egiga5 = {
            PARENT: [exports.elita2to5],
            LABEL: 'E-GIGA AA05', 
            VALUE: 520000,
            BODY: {
            FOV: 4,
            SPEED: base.SPEED * 0.35,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, 
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    },
            ],
        };
        exports.egiga6 = {
            PARENT: [exports.elita],
            LABEL: 'E-GIGA AA06',
            VALUE: 600000,
            BODY: {
            FOV: 4.5,
            SPEED: base.SPEED * 0.35,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//.',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//#',
                    }, },
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     0,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      120,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     240,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 18, }]
                    },
            ],
        };
        exports.egiga7 = {
            PARENT: [exports.elita],
            LABEL: 'E-GIGA AA07',
            VALUE: 680000,
            BODY: {
            FOV: 5,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//.',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//#',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 8CAEF5401',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 454CDA26F',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete A372E3D19',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete FF650417B',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete BC44D7610',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 2187EA3C3',
                    }, },
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     0,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      120,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     240,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  9,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    },
            ],
        };
        exports.egiga8 = {
            PARENT: [exports.elita],
            LABEL: 'E-GIGA AA08',
            VALUE: 760000,
            BODY: {
            FOV: 5.5,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    15,    4,     -1.5,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     60,     0.333,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     180,     0.667,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray, g.morespray, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray, g.morespray, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray, g.morespray, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//.',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//#',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 8CAEF5401',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 454CDA26F',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,    120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete A372E3D19',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete FF650417B',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete BC44D7610',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 2187EA3C3',
                    }, },
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     0,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      120,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     240,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  9,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     19,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, { 
                POSITION: [  7,     19,      0,       120,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, {
                POSITION: [  7,     19,      0,       240,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, 
            ],
        };
        exports.egiga9 = {
            PARENT: [exports.elita],
            LABEL: 'E-GIGA AA09',
            VALUE: 840000,
            BODY: {
            FOV: 6,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4.5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    15,    4,     -1.5,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     60,     0.333,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     180,     0.667,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                POSITION: [    15,    4,     -1.5,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**40%)',
                    }, }, {        
                POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ],                                                           
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//.',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//#',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 8CAEF5401',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 454CDA26F',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete A372E3D19',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete FF650417B',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete BC44D7610',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 2187EA3C3',
                    }, }, {
                POSITION: [    10,    13.5,     -1.1,      6,      0,     0,     0.2,   ],                                                                       
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.rcannon, g.strike, g.doublereload, g.doublereload]),
                        TYPE: exports.lightningstrike,
                        LABEL: 'DELETE.PLAYER*3*//#',
                    }, }, 
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  9,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto56gun, { INDEPENDENT: false, COLOR: 8, }]
                    }, {
                POSITION: [  7,     19,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, { 
                POSITION: [  7,     19,      0,       120,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, {
                POSITION: [  7,     19,      0,       240,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, 
            ],
        };
        exports.egiga10 = {
            PARENT: [exports.elita],
            LABEL: 'E-GIGA AA10',
            VALUE: 1000000,
            BODY: {
            FOV: 8,
            SPEED: base.SPEED * 0.2,
            HEALTH: base.HEALTH * 4,
            SHIELD: base.SHIELD * 4, 
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 5, 
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    15,    4,     -1.5,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     60,     0.333,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                      POSITION: [    15,    4,     -1.5,      6,      0,     180,     0.667,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.sniper]),
                        TYPE: exports.swarm,
                        LABEL: 'swarmdelete."KILL"+3&null=true?/#!(3x.y**20%)',
                    }, }, {
                POSITION: [    12.5,    10,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoA',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoB',
                    }, }, {
                      POSITION: [    12.5,    10,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.fast, g.morespray, g.morespray, g.halfreload, g.lessreload]),
                        TYPE: exports.block,
                        LABEL: 'BLOCK*3(nullify.string(x²+y²))InfoC',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*a(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*b(2/3+x)',
                    }, }, {
                POSITION: [    10,    10,     1.7,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.stream, g.doublereload, g.morespray]),
                        TYPE: exports.bullet,
                        LABEL: 'W=t9*c(2/3+x)',
                    }, }, {
               POSITION: [    17,    5,     -1.1,      6,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//.',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//)',
                    }, }, {
                POSITION: [    17,    5,     -1.1,      6,      0,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: 'DELETE.PLAYER*2*//#',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 8CAEF5401',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 454CDA26F',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      3,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete A372E3D19',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete FF650417B',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete BC44D7610',
                    }, }, {
                POSITION: [    21,    4,     1,      6,      -3,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                        LABEL: '====death.sin*cos#(2+x3).delete 2187EA3C3',
                    }, }, {
                POSITION: [    10,    13.5,     -1.1,      6,      0,     120,     0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.rcannon, g.strike, g.doublereload, g.doublereload]),
                        TYPE: exports.lightningstrike,
                        LABEL: 'DELETE.PLAYER*3*//.',
                    }, }, {
                POSITION: [    10,    13.5,     -1.1,      6,      0,      240,     0.2,   ], 
                    PROPERTIES: {                                                                                                                        
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.rcannon, g.strike, g.doublereload, g.doublereload]),
                        TYPE: exports.lightningstrike,
                        LABEL: 'DELETE.PLAYER*3*//)',
                    }, },
                   ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  15,     0,      0,     0,    360,   0, ], 
                    TYPE: [exports.crasherSpawner2]
                    }, {
                POSITION: [  7,     5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  7,     -5,      -5,       0,    360,   1, ],  
                    TYPE: [exports.bigauto46gun, { INDEPENDENT: false, COLOR: 18, }]
                    }, {
                POSITION: [  9,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto0gun, { INDEPENDENT: false, COLOR: 13, }]
                    }, {
                POSITION: [  7,     19,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, { 
                POSITION: [  7,     19,      0,       120,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, {
                POSITION: [  7,     19,      0,       240,    360,   1, ],  
                    TYPE: [exports.bigauto44gun, { INDEPENDENT: false, COLOR: 3, }]
                    }, 
            ],
        };
        
        exports.elite_destroyer = {
            PARENT: [exports.elita],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elita],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elita],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };
exports.gamer = {
        PARENT: [exports.miniboss],
        FACING_TYPE: 'locksFacing',
        LABEL: 'Gamer',
        COLOR: 203,
        SHAPE: [[0.6,-0.8],[0,-0.8],[-0.2,-0.6],[-0.2,0.6],[0,0.8],[0.6,0.8],[0.8,1.4],[-1,1.4],[-1.2,0.8],[-1,0.8],[-1.2,0.2],[-1.2,0],[-1,-0.8],[-1.2,-0.8],[-1,-1.4],[0.75,-1.4]],
        SIZE: 45,
        VARIES_IN_SIZE: false,                                                                                                                                                                                                  // a
        VALUE: 275000,
        PLAY_SOUND_GAMER: true, 
        BODY: {
            FOV: 10, 
            SPEED: base.SPEED * 1.3,
            HEALTH: base.HEALTH * 3,
            SHIELD: base.SHIELD * 4,  
            REGEN: base.REGEN, 
            DAMAGE: base.DAMAGE * 3, 
        },
    };
exports.gametime = {
            PARENT: [exports.gamer],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    12,    3.5,     1,      1,      11.5,     0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [    12,    3.5,     1,      1,      -11.5,      0,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fast, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
                   ], 
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     -1,      6,       0,    180,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: false, COLOR: 203, }] 
                    }, {
                POSITION: [  5,     -1,      -6,       0,    180,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: false, COLOR: 203, }] 
                    }, {
                POSITION: [  4,     -7,      0,       0,    360,   1, ],  
                    TYPE: [exports.stRangerdanger, { INDEPENDENT: false, COLOR: 201, }] 
                    }, {
                POSITION: [  4.5,     -7.25,      9,       0,    360,   1, ],  
                    TYPE: [exports.quadtrapper, { INDEPENDENT: false, COLOR: 202, }] 
                    }, {  
                POSITION: [  2,     -9,      -9.75,       0,    360,   1, ],  
                    TYPE: exports.controllerbutton1,  
                    }, {
                POSITION: [  2,     -4,      -9.75,       0,    360,   1, ],  
                    TYPE: exports.controllerbutton2,  
                    }, {
                POSITION: [  2,     -6.5,      -12.25,       0,    360,   1, ],  
                    TYPE: exports.controllerbutton3,  
                    }, {
                POSITION: [  2,     -6.5,      -7.25,       0,    360,   1, ],  
                    TYPE: exports.controllerbutton4,  
                    },
            ],
        };
    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
exports.cfminion = {
    PARENT: [exports.badStats],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'autospin',
    SHAPE: 5,
    BODY: {
        FOV: 1.2,
        SPEED: 1.8,
        ACCELERATION: 0.15,
        HEALTH: 10,
        SHIELD: 0,
        DAMAGE: 0.8,
        RESIST: 1,
        PENETRATION: 1.3,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,     6,      1,      0,      0,      36,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.lessreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     6,      1,      0,      0,      72+36,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.lessreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     6,      1,      0,      0,      144+36,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.lessreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     6,      1,      0,      0,      216+36,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.lessreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     6,      1,      0,      0,      288+36,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.halfreload, g.lessreload]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, },
    ],
};
exports.trapTurretCF = {
    PARENT: [exports.badStats],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.4,
    },
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.halfreload, g.lessreload, g.fast]),
                AUTOFIRE: true,
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.crystalfortress = (() => {
        let props2 = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload]),
            TYPE: exports.cfminion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        }; 
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Crystal Fortress',
            COLOR: 82,
            SHAPE: 6,
            SIZE: 34,
            VALUE: 700000,
            FACING_TYPE: 'autospin',
            BODY: {
                FOV: 2,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2.8,
                SHIELD: base.SHIELD * 3,
                REGEN: base.REGEN * 0.8,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   1,     5,     1,     0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.halfreload, g.halfreload, g.fast]),
                            TYPE: exports.block,
                        }, }, {
                POSITION: [   1,     5,     1,     0,     0,     120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.halfreload, g.halfreload, g.fast]),
                            TYPE: exports.block,
                        }, }, {
                POSITION: [   1,     5,     1,     0,     0,     240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.halfreload, g.halfreload, g.fast]),
                            TYPE: exports.block,
                        }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props2, }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     0,     0,   ], 
                    }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     60,     0,   ], 
                    }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     120,     0,   ], 
                    }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     180,     0,   ], 
                    }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     240,     0,   ], 
                    }, {
                POSITION: [   15,      3.5,    0.001,     0,      0,     300,     0,   ], 
                    }, 
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurretCF,
                        },
            ],
        };
    })();
exports.ylosnipedef = {
        PARENT: [exports.miniboss],
        LABEL: '',
        COLOR: 3,
        SHAPE: 0,
        SIZE: 16,
        VARIES_IN_SIZE: false,
        DANGER: 60,
        VALUE: 900000000,
        BODY: {
            FOV: 2000,
            SPEED: base.SPEED * 5,
            HEALTH: base.HEALTH * 10,
            SHIELD: base.SHIELD * 3,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 50,
        },
    };
    exports.yellowsniper = {
        PARENT: [exports.ylosnipedef],
        LABEL: '🅈𝟛L̸̡̪̦͎͍̆ͅL̷̩͓̤̖̣̫̱̳̓́̾̓̾̏̾̈́͠͝0₩ $𝖓1P̵̨̯̋̈́͒͒͘ǝᏒ',
        FACING_TYPE: 'locksFacing',
        CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.op, g.halfreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.crazyminion = {
    PARENT: [exports.badStats],
    LABEL: 'F̵̛̰͔͎̮̯͇̗̪̪͎̺̖̟̤͇͈̝͍̣́͌̾̐̒̍̇͋̄̍̋͗̊̍͊̎̄͆͑̅̚̕̚͠͝͠͠ͅ!̷̨̼̻̍͐̔͗̓̐̈́̆̈́̈́̌̑͌̅́̋̑̓̅̅̄͐̅͘̚͝$̸̡̧̧̟̪̩̣͔̹͎̝̝̯͉̻̘̰̜̬̭̮́̊̈́͗͒͛̾̂̌͆̽̋͋̊͝ͅͅ4̶̨̢̨̭̫̺̖̭̰͓̮̹̣̮̳͍̯͓̳̝̺͕͈͍͓͇͛̆́͛̉̐̿͊̀͌̄̆̀̓͗̾͆́̍̚͜͜͜ͅ2̶̛͇͈͕͉̦̦͋̂̈́̃̐̃͆̀̅̑͂̃̊̑̆̽́̄̑̄̌̾̕͝ͅͅV̵̧̞̞̞̠̞̻̳͎͖̲̯͇̗̬͖̱͍̅͒̄̄́̐̔͑́͑̑͐̐͐͌̈́͘̕͜͠͝ͅẸ̸̢̧͚̦̲͓̱̜͍͎̣̲̯̙̰̤̠̥̻̥̠̞̘̋̉̄͊͜ͅͅ ̵̛̛̆̂̆̋͌̅̐͂̋̈̄́͂̓̚͜͝͝#̶̡̢͓̬͎͉͚̻͇̘̣̱̭̥͍̼̱͌̈́̑̓̄̎̏̂͆̋̒͐͋̀͌͘ͅŔ̴̘̠̯͉̹̮̘̳̣͊̆͛͆͊̓͘͘ͅ', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 1.5,
        SPEED: 15,
        ACCELERATION: 0.4,
        HEALTH: 2,
        SHIELD: 0,
        DAMAGE: 1,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     9,      1.25,   4,   2.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.crazy]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.chaosturret = {
    PARENT: [exports.badStats],
    LABEL: 'Turret',
    BODY: {
        FOV: 1.8
    },
    COLOR: 42,
    MAX_CHILDREN: 4,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  13,    10,      5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: exports.crazyminion,
            }, },
    ],
};
exports.opspray = {
                PARENT: [exports.badStats],
                LABEL: 'U̴͈͚̞̟̐͊̆̄͊̓̏͌͂̇̌̚I̷̢̨̜̖͔̫͎̩̩͔͕̱̩̱̎͑̿̽͝R̶̨̡̡͈̹̬̘̩̲͖͈̱̥̼̻͔͈͈͓͍̹̻̱̦̘̥͍͐͋̓͌͋̇͆̋͂́̊̈͋̍̏̿͌͌̊̽̎́̀̃̂̓͝͠ͅͅ#̸̮͉͍̱͈̯̖͖͖̬̪͉̓͑̐̏̑̈́̄̍̑̋͑͠B̸̧̡͍͙̘̭̤̼̫̖͍̏͋̎̆̽́̈́̐͒̅̽̎̇̐̓́͂̂̈́́͋̿̀̚̚͠͝͠Ẇ̷̨̡̨̨̛̹͙̬͚̺̼̟̩̣̜̝̱̲̥̺͖͚̙̳͎̝̮̠̓̍̃͆͊̐͂͐̓͌̍̍̀̆̈́̍̈̔̂̏̚͜͠K̵̡̜̗̟͇͕̙̦͙̒̂͌̌̈̎̂͗̏͂͗̑̎̊͂̊̋̈̄̅͑͑͘̕͝R̸̢̨͎̙̺̩̹̺̳̠̮͖̬͈̯̗̞̠̂͆̓͊̾̓͊͜͝͠#̶̧̨̢̛̛͚̼̯̼̰͔͓̦̠͙̬͓͓̘̙͍͕̭̰͙̰̲̜̐̉̄̾͗́͐̒̃̚͘͝͠B̷̡̛͖̮͍̹̣̬̣̫̻̹̜̗̻̻̪͇̫̻̱̰̬͕̊̽̐̃̑̉̿͂̎̏̆̇̚͜͝͝͝ͅͅ ̸̨̢̗̬̝̲̱̼̘̬̘̮̺̝͍͉̭͓̮̫̗͍̟͊̃̀̓̈́̇̑̇̅̎̓̚͘͘͘͜͜͠f̷̖̹̯͑̾͗͆̔̋̿̊̽̆̂̎͑̀̓̈́̓̇̽̚͘̚͠͠͝ͅ3̵̧̱̟̪̞͍̰͔̜͖̪̳̦̣̍̊̌̂̎̐̈̄͌̊̑̈̕͜ͅ',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil, g.halfreload, g.crazy]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.7,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.halfreload, g.crazy]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.crazyboss = {
        PARENT: [exports.miniboss],
        LABEL: 'C H A O S',
        COLOR: 42, 
        SHAPE: 5,
        SIZE: 100,
        VARIES_IN_SIZE: false,
        VALUE: 1234567,
        MAX_CHILDREN: 8,
        CHAOS_EFFECT: true,
        BODY: {
            FOV: 20,
            SPEED: base.SPEED * 2.3,
            ACCELERATION: base.ACCEL * 2.15,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 2.75,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
    };
exports.chaos = { 
            PARENT: [exports.crazyboss],
            FACING_TYPE: 'chaosspin', 
            AI: { NO_LEAD: false, },
            MAX_CHILDREN: 4,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.opspray, { COLOR: 42, }],
                        }, {
                POSITION: [  10,     6,      0,      60,    40, 0], 
                    TYPE: [exports.opspray, { COLOR: 268, }],
                        }, {
                POSITION: [  15,     6,      0,     -60,    261, 0], 
                    TYPE: [exports.opspray, { COLOR: 269, }],
                        }, {
                POSITION: [  8,     6,      0,      127,    88, 0], 
                    TYPE: [exports.opspray, { COLOR: 270, }],
                        }, {
                POSITION: [  12,     6,      0,     219,    142, 0], 
                    TYPE: [exports.opspray, { COLOR: 271, }],
                        }, {
                 POSITION: [  12,     0.5,      -0.77,     234,    360, 1], 
                    TYPE: [exports.chaosturret, { COLOR: 42, }],
                        },         
                          ],
        };
exports.seven = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 7,
    SKILL: skillSet({ 
        rld: 1,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    HITS_OWN_TYPE: 'hard',
    GIVE_KILL_MESSAGE: false,
};
exports.class7 = {
        PARENT: [exports.seven],
        LABEL: 'Rhythm Seven', //!!!!
        COLOR: 7,
    SHAPE: [[0.7,-0.5],[0.4,-0.5],[0.4,-0.8],[1,-0.8],[1,0.2],[-1,0.2],[-1,-0.1],[0.7,-0.1]],
        VARIES_IN_SIZE: false,
        SIZE: 15,
        VALUE: 77777, 
        ACCEPTS_SCORE: false,
        BODY: { 
            FOV: 2.7,
            SPEED: base.SPEED * 9.77,
            ACCELERATION: base.ACCEL * 0.49,  
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 3,    
            REGEN: base.REGEN * 0.7,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,    3,    1,     10,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fast, g.fast, g.fast, g.fast, g.fast, g.halfreload, g.knockb7]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    3,    1,     10,      -6,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.fast, g.fast, g.fast, g.fast, g.fast, g.knockb7]),
                        TYPE: exports.bullet,
                    }, }, 
            ], 
    }; 
exports.fourteen = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 4, 
    SKILL: skillSet({ 
        rld: 1,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,    
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    HITS_OWN_TYPE: 'hard',
};
exports.class14 = { 
        PARENT: [exports.fourteen],
        LABEL: 'Class Fourteen', 
        COLOR: 14,
        SIZE: 20,
        SHAPE: [[-1,0.6],[0.6,0.6],[-1,0.2],[-1,0],[0.6,0],[-1,-0.2],[0.6,-0.2],[-1,-1],[1,-0.5],[0.8,0.4],[1,1],[-1,1]],
        FACING_TYPE: 'smoothToTarget',
        VALUE: 38416,
        BODY: {
            FOV: 2.8, 
            SPEED: base.SPEED * 0,
            ACCELERATION: base.ACCEL * 0, 
            HEALTH: base.HEALTH * 14,
            SHIELD: base.SHIELD * 7, 
            REGEN: base.REGEN * 2.8, 
            DAMAGE: base.DAMAGE * 2.8,
            PENETRATION: base.PENETRATION * 0.05,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  0,    4,    1,     -5,      4,      180,      0.05,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14]),
                        TYPE: exports.purplebullet,
                    }, }, {
                POSITION: [  0,    4,    1,     -5,      -4,      180,      0.05,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14]),
                        TYPE: exports.purplebullet,
                    }, }, {
                POSITION: [  0,    4,    1,     -5,      0,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14]),
                        TYPE: exports.purplebullet,
                    }, }, {
                 POSITION: [  0,    4,    1,     5,      4,      0,      0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14_1]),
                        TYPE: exports.purplebullet,
                    }, }, {
                POSITION: [  0,    4,    1,     5,      -4,      0,      0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14_1]),
                        TYPE: exports.purplebullet,
                    }, }, {
                POSITION: [  0,    4,    1,     5,      0,      0,      0.15,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.c14_1]),
                        TYPE: exports.purplebullet,
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      -7,      180,      1,   ], 
                    PROPERTIES: { 
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      -7,      180,      1.02,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      -7,      180,      1.04,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      -7,      180,      1.06,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      -7,      180,      1.08,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      5,      180,      1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      5,      180,      1.02,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      5,      180,      1.04,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      5,      180,      1.06,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   0,    2,    1,     -6,      5,      180,      1.08,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.swarm14]),
                        TYPE: exports.purpleswarm, 
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, 
            ],
    }; 
exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: "EthanInDaBackground",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};
exports.hehe = {
                PARENT: [exports.badStats],
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                LABEL: 'Do you really know what you are doing? Or is this just an act?',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.detoyr,
                            MAX_CHILDREN: 5,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.ohlord = {
                PARENT: [exports.badStats],
                BODY: {
                    FOV: base.FOV * 1.3,
                },
                LABEL: 'Security Guard',
                DANGER: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload]),
                            TYPE: exports.sentinel,
                            MAX_CHILDREN: 5,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, {
                    POSITION: [  21,    2.5,    1,     0,      6.5,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    2.5,    1,     0,      -6.5,      0,      0,  ], 
                        }, {
                    POSITION: [  16.5,    8,    0.001,     0,      3.25,      20,      0,  ], 
                        }, {
                    POSITION: [  16.5,    8,    0.001,     0,      -3.25,      -20,      0,  ], 
                        }, 
                ],
            };
exports.fatlard = {
            PARENT: [exports.badStats],
            LABEL: 'Fat Lard',
            STAT_NAMES: statnames.generic,
            DANGER: 6094839576473589324858538678940,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     30,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.slow, g.slow, g.slow, g.slow]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     30,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     30,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.slow, g.slow, g.slow, g.slow]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
 
// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [
    exports.basic, 
    exports.master,
    exports.shotgun2, 
    exports.friple,
    exports.egiga1,
    exports.detoyr2,
    exports.metagun,
    exports.diversionist,
    exports.attackergun,
    exports.absorber,
    exports.breaker, 
  exports.egigaC2
];
 
exports.egiga1.UPGRADES_TIER_1 = [exports.egiga2];
exports.egiga2.UPGRADES_TIER_1 = [exports.egiga3];
exports.egiga3.UPGRADES_TIER_1 = [exports.egiga4]; 
exports.egiga4.UPGRADES_TIER_1 = [exports.egiga5];
exports.egiga5.UPGRADES_TIER_1 = [exports.egiga6];
exports.egiga6.UPGRADES_TIER_1 = [exports.egiga7];
exports.egiga7.UPGRADES_TIER_1 = [exports.egiga8];              
exports.egiga8.UPGRADES_TIER_1 = [exports.egiga9];
exports.egiga9.UPGRADES_TIER_1 = [exports.egiga10];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.trapper, exports.health];
        exports.basic.UPGRADES_TIER_3 = [exports.single, exports.healingtank];
 
exports.health.UPGRADES_TIER_2 = [exports.funnytanks];                                                                                                                                                                                                          
exports.funnytanks.UPGRADES_TIER_3 = [exports.acceler, exports.HUH, exports.broomer, exports.detoyr, exports.gimme_kiss, exports.tributpain, exports.xxx, exports.hahaHAHA, exports.twiplit2, exports.g];
exports.xxx.UPGRADES_TIER_4 = [exports.malicious];  
exports.g.UPGRADES_TIER_3 = [exports.ğ];

exports.single.UPGRADES_TIER_4 = [exports.foreversingle];

    exports.basic.UPGRADES_TIER_2 = [exports.smash];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.wptrg98, exports.smash2];
    
    exports.healingtank.UPGRADES_TIER_3 = [exports.healingtriplet];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa, exports.churner];
        exports.twin.UPGRADES_TIER_3 = [exports.twiniwt];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.doubletw9xN];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.triple, exports.spread, exports.benthybrid, exports.bentdouble, exports.gurglingwater];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.machinegunner, exports.gnuuer];
        exports.churner.UPGRADES_TIER_3 = [exports.packer, exports.whip];
        exports.penta.UPGRADES_TIER_4 = [exports.genderbender];
        exports.triple.UPGRADES_TIER_4 = [exports.quint, exports.twiplit]

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack, exports.elitaman];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.knockback];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind];  
        exports.rifle.UPGRADES_TIER_3 = [exports.musket, exports.hitman, exports.electric_railcannon];
        exports.musket.UPGRADES_TIER_4 = [];  

    exports.trapper.UPGRADES_TIER_2 = [exports.tritrapper, exports.builder, exports.flanktrap];
    exports.trapper.UPGRADES_TIER_3 = [exports.boredashell]; 
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.quadtrapper, exports.boomer, exports.ohlord];
        exports.tritrapper.UPGRADES_TIER_3 = [exports.quadtrapper, exports.pentatrap, exports.hexatrap, exports.heptatrap, exports.octotrap];                                        

    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner, exports.flame];
        exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.eee];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.go, exports.construct, exports.shotgun2, exports.deflect, exports.hiveshooter];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer, exports.twister, exports.hiveshooter, exports.ggbro, exports.yrellitra,];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.mega, exports.micromacro];  
        exports.flame.UPGRADES_TIER_3 = [exports.blaster, exports.flashflood]; 
        exports.anni.UPGRADES_TIER_4 = [exports.decimator, exports.thruster];        
        exports.stream.UPGRADES_TIER_4 = [exports.spammer];  
        exports.skimmer.UPGRADES_TIER_4 = []; 
        exports.shotgun2.UPGRADES_TIER_4 = [exports.transShotgun];
        exports.hybrid.UPGRADES_TIER_4 = [exports.thruster]; 
        exports.hiveshooter.UPGRADES_TIER_4 = [exports.rental1]; 
 
    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.tritrapper];
        exports.flank.UPGRADES_TIER_3 = [];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.ud];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.trihectahexacontagon];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber, exports.fatlard];
        

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact];
        exports.director.UPGRADES_TIER_3 = [exports.wtf];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.overmancer];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.overmancer, exports.shithead]; 
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.infestor, exports.fortress];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autospawn];

    exports.squarebasic.UPGRADES_TIER_2 = [exports.twin2];
        exports.twin2.UPGRADES_TIER_3 = [exports.bent2, exports.gunner2, exports.double2];
        exports.bent2.UPGRADES_TIER_3 = [];
        exports.double2.UPGRADES_TIER_3 = [exports.tripletwin2, exports.autodouble2, exports.split2];
        exports.gunner2.UPGRADES_TIER_3 = [exports.machinegunner2, exports.autogunner2, exports.nailgun2];

    /*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

exports.testbed.UPGRADES_TIER_1.push(exports.elite_sprayer);
