const icons = Object.freeze({
    add: (w = 14, h = 14) => {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 24">
                <path d="M23 11H13V1c0-.6-.5-1-1-1s-1 .5-1 1v10H1c-.6 0-1 .5-1 1s.5 1 1 1h10v10c0 .6.5 1 1 1s1-.5 1-1V13h10c.6 0 1-.5 1-1s-.5-1-1-1z"/>
            </svg>
        `;
    },
    cross: (w = 12, h = 12) => {
        return `
            <svg width="${w}" height="${h}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="m2.29679575 12.2772478c-.39658757.3965876-.39438847 1.0328109-.00062148 1.4265779.39651227.3965123 1.03246768.3934888 1.42657791-.0006214l4.27724782-4.27724787 4.2772478 4.27724787c.3965876.3965875 1.0328109.3943884 1.4265779.0006214.3965123-.3965122.3934888-1.0324677-.0006214-1.4265779l-4.27724787-4.2772478 4.27724787-4.27724782c.3965875-.39658757.3943884-1.03281091.0006214-1.42657791-.3965122-.39651226-1.0324677-.39348875-1.4265779.00062148l-4.2772478 4.27724782-4.27724782-4.27724782c-.39658757-.39658757-1.03281091-.39438847-1.42657791-.00062148-.39651226.39651227-.39348875 1.03246768.00062148 1.42657791l4.27724782 4.27724782z" fill="#666" fill-rule="evenodd"/>
            </svg>
        `;
    },
    arrowLeft: (w = 12, h = 12) => {
        return `
            <svg width="${w}" height="${h}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="m4.46975946 3.28337502-4.17620792 4.03074001c-.39120768.37758093-.39160691.98937525.0000316 1.367372l4.1763942 4.03091977c.39122514.3775978 1.01908149.3838182 1.40017357.0160006.39113012-.3775061.3930364-.9877245-.00310603-1.3700683l-2.48183446-2.39538585h11.61478958l.1166211-.00649339c.4973387-.055753.8833789-.46370161.8833789-.95867408 0-.49497246-.3860402-.90292107-.8833789-.95867408l-.1166211-.00649338h-11.61478958l2.4816273-2.39518594c.39282216-.37913917.40056173-.98637524.01946965-1.35419292-.39113012-.37750607-1.02492687-.37784433-1.41654791.00013556z" fill="#666" fill-rule="evenodd"/>
            </svg>
        `;
    },
    arrowRight: (w = 12, h = 12) => {
        return `
            <svg width="${w}" height="${h}" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="m11.5302405 12.716625 4.176208-4.03074003c.3912076-.37758093.3916069-.98937525-.0000316-1.367372l-4.1763942-4.03091981c-.3912252-.37759778-1.0190815-.38381821-1.4001736-.01600053-.39113013.37750607-.39303641.98772445.003106 1.37006824l2.4818345 2.39538588h-11.6147896l-.11662112.00649339c-.49733869.055753-.88337888.46370161-.88337888.95867408 0 .49497246.38604019.90292107.88337888.95867408l.11662112.00649338h11.6147896l-2.4816273 2.39518592c-.39282218.3791392-.40056175.9863753-.0194697 1.3541929.3911302.3775061 1.0249269.3778444 1.4165479-.0001355z" fill="#666" fill-rule="evenodd"/>
            </svg>
        `;
    }
});

export {icons};
