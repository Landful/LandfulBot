module.exports = function onReady() {
    console.log(this.user.username, 'on!');
    if (this.mentionPrefix) {
        this.prefixes.push(`<@${this.user.id}>`);
    }
}