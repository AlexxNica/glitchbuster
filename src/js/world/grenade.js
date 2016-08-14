function Grenade(){
    this.x = this.y = 0;

    this.throw = function(angle, force){
        this.vX = cos(angle) * force;
        this.vY = sin(angle) * force;
    };

    this.cycle = function(e){
        if(!this.stuck){
            this.vY += e * GRAVITY * 0.5;

            this.x += this.vX * e;
            this.y += this.vY * e;
        }

        var tile = W.tileAt(this.x, this.y);
        if(tile && !this.stuck){
            this.stuck = true;

            tile.pushAway(this, GRENADE_RADIUS_2, GRENADE_RADIUS_2);
        }
    };

    this.explode = function(){
        var r = TILE_SIZE * 2;
        for(var row = ~~((this.y - r) / TILE_SIZE) ; row < ~~((this.y + r) / TILE_SIZE) ; row++){
            for(var col = ~~((this.x - r) / TILE_SIZE) ; col < ~~((this.x + r) / TILE_SIZE) ; col++){
                W.destroyTileAt(row, col);
            }
        }

        var m = this;
        setTimeout(function(){
            var i = W.grenades.indexOf(m);
            if(i >= 0){
                W.grenades.splice(i, 1);
            }
        }, 0);
    };

    this.render = function(){
        R.fillStyle = 'red';
        R.fillRect(this.x - GRENADE_RADIUS, this.y - GRENADE_RADIUS, GRENADE_RADIUS_2, GRENADE_RADIUS_2);
    };
}