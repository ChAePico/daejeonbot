module.exports={
    name: 'ready',
    once: true,
    execute(client){
        client.user.setPresence({activities: [{name: '대전향우회 잡다한 기능'}], status: 'online'});
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
}