const slowerregen = 1 / 55;
const slowregen = 1 / 45;
const normalregen = 1 / 35;
const fastregen = 1 / 25;
const sporeBlockDeathTrail = newEffect(45, e => {
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 8 - Math.abs(8 - (e.fin() * 16)), d);
});
const sporeBlockDeathHit = newEffect(30, e => {
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    const f = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 - e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 9, d);
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 9, f);
});
const sporeBlockDeathFx = newEffect(80, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
	}
	else{
		alignGrad = e.fout();
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 0.5 + e.fin() * 16, d);
});


const sporeBlockDeath = extend(ArtilleryBulletType, {});

sporeBlockDeath.speed = 1.5;
//this does 800 damage per 5 ticks btw.
sporeBlockDeath.damage = 3;
sporeBlockDeath.splashDamage = 3;
sporeBlockDeath.splashDamageRadius = 5;
sporeBlockDeath.bulletWidth = 4;
sporeBlockDeath.bulletHeight = 5;
sporeBlockDeath.bulletShrink = 0;
sporeBlockDeath.hitShake = 0;
sporeBlockDeath.lifetime = 80;
sporeBlockDeath.collidesTiles = true;
sporeBlockDeath.collides = true;
sporeBlockDeath.collidesAir = true;
sporeBlockDeath.trailEffect = sporeBlockDeathTrail;
sporeBlockDeath.hitEffect = sporeBlockDeathHit;
sporeBlockDeath.hitSound = Sounds.none;
sporeBlockDeath.despawnEffect = Fx.wet;
sporeBlockDeath.hitSize = 5;
sporeBlockDeath.pierce = true;
sporeBlockDeath.homingPower= 12;
sporeBlockDeath.homingRange= 16;
sporeBlockDeath.bulletSprite = "shell";
sporeBlockDeath.frontColor = Color.valueOf("#42336f");
sporeBlockDeath.backColor = Color.valueOf("#6d54b7");
//print("testing 123");

const darkSporeBlock = extendContent(Wall, "dark-spore-block", {
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(slowerregen)) ) {

                   tile.entity.health += 10;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health() = tile.entity.maxHealth();
				   } */
					   
                   
            }
      }
});
const darkSporeBlockLarge = extendContent(Wall, "dark-spore-block-large", {
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(slowregen)) ) {

                   tile.entity.health += 20;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      }
});
extendContent(Cultivator, "sporecluster", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.breakSound.at(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterb", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.breakSound.at(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterc", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.breakSound.at(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(Cultivator, "sporeclusterd", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
    update(tile){
        this.super$update(tile);
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(normalregen)) ) {

                   tile.entity.health += 15;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
            }
      },
	onDestroyed: function(tile){
		this.breakSound.at(tile);
        for(var i = 0; i < 10; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.25, 1.10));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});
extendContent(DoubleTurret, "spore-turret", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
        Draw.color();
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(DoubleTurret, "spore-turret-b", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
        Draw.color();
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(DoubleTurret, "spore-turret-c", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
        Draw.color();
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
/* extendContent(Floor, "spore-water", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(Floor, "spore-water-deep", {
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
}); */
extendContent(ItemTurret, "spore-turret-small", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 8;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
});
extendContent(ItemTurret, "spore-turret-small-dark", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
	},
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 10;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 7; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	}
});

const sporeConveyor = extendContent(Conveyor, "spore-conveyor", {
	draw(tile){
		Draw.rect(Core.atlas.find(this.name + "-base"), tile.drawx(), tile.drawy());
        this.super$draw(tile);
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name + "-base"),
            Core.atlas.find(this.name + "-0-1")
        ];
    },
    update(tile){
        //when health is lower than max health
        if ( (tile.entity.health() < tile.entity.maxHealth()) && (Mathf.chance(fastregen)) ){

                   tile.entity.health += 5;
				   /* if (tile.entity.health() > tile.entity.maxHealth()){
					   tile.entity.health -= tile.entity.maxHealth() - tile.entity.health();
				   } */ // unknown if this works
					   
                   
        };
        this.super$update(tile);
     },
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 3; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.worldx(), tile.worldy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
			Effects.effect(sporeBlockDeathFx, tile.worldx(), tile.worldy(), Mathf.random(-360,360));
		}
	},
});
const sporeUnitBirth = newEffect(72, e => {
    Draw.color(Color.valueOf("#455085"), Color.valueOf("#995d9a"), e.fin());
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 12 + 1);
    }});
    Lines.stroke(e.fout() * 5);
    Angles.randLenVectors(e.id, 12, 1 + 18 * e.fin(), e.rotation, 360,d);
    Draw.color(Color.valueOf("#455085"), Color.valueOf("#995d9a"), e.fout());
    Lines.stroke(e.fout() * 12);
    Lines.circle(e.x, e.y, e.fin() * 16);
    const f = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1, 45 - e.rotation);
    }});
    Draw.color(Color.valueOf("#8d69db"), Color.valueOf("#995d9a"), Mathf.random(-1,1));
    Angles.randLenVectors(e.id, 36, 1 + 24 * e.fin(), e.rotation, 360,f);
});
const mutatorUpdate = newEffect(45, e => {
	Draw.color(Color.valueOf("#9f81db"), Color.valueOf("#008fc4"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.random(1,2));
    }})
    Angles.randLenVectors(e.id, 3, -6 + e.fin() * 12, d);
});
const sporeMutator = extendContent(GenericCrafter, "mutator", {
	draw(tile){
		if (this.initiate != true){
			this.initiate = true;
			this.variant = Math.ceil(Math.random(0,4));
			this.angle1 = Math.floor(Math.random(0,4));
			this.rot1 = 90 * this.angle1;
			this.angle2 = Math.floor(Math.random(0,4));
			this.rot2 = 90 * this.angle2;
		}
		else{
			if (Math.random < 0.03){
				this.variant = Math.ceil(Math.random(0,4));
			}
			if (Math.random < 0.05){
				this.angle1 = Math.floor(Math.random(0,4));
				this.rot1 = 90 * this.angle1;
			}
			if (Math.random < 0.05){
				this.angle2 = Math.floor(Math.random(0,4));
				this.rot2 = 90 * this.angle2;
			}
		}
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.alpha((tile.entity.items.total() - tile.entity.items.get(this.outputItem.item)) / this.itemCapacity);
		Draw.rect(Core.atlas.find(this.name + "-input" + this.variant), tile.drawx(), tile.drawy(), this.rot1);
		Draw.alpha(tile.entity.items.get(this.outputItem.item) / this.itemCapacity);
		Draw.rect(Core.atlas.find(this.name + "-output" + this.variant), tile.drawx(), tile.drawy(), this.rot2);
		Draw.alpha(tile.entity.liquids.get(tile.entity.liquids.current()) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
		Draw.reset();
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-input0"),
            Core.atlas.find(this.name + "-top"),
        ];
    }
});
sporeMutator.updateEffect = mutatorUpdate;
sporeMutator.angle1 = 0;
sporeMutator.angle2 = 0;
sporeMutator.rot1 = 0;
sporeMutator.rot2 = 0;
sporeMutator.variant = 0;
sporeMutator.initiate = false;

const sporeVaultDeathSmall = extend(ArtilleryBulletType, {});

sporeVaultDeathSmall.speed = 12;
//this does 800 damage per 5 ticks btw.
sporeVaultDeathSmall.damage = 45;
sporeVaultDeathSmall.splashDamage = 200;
sporeVaultDeathSmall.splashDamageRadius = 60;
sporeVaultDeathSmall.bulletWidth = 4;
sporeVaultDeathSmall.bulletHeight = 5;
sporeVaultDeathSmall.bulletShrink = 0;
sporeVaultDeathSmall.hitShake = 0;
sporeVaultDeathSmall.lifetime = 40;
sporeVaultDeathSmall.collidesTiles = true;
sporeVaultDeathSmall.collides = true;
sporeVaultDeathSmall.collidesAir = true;
sporeVaultDeathSmall.trailEffect = sporeBlockDeathTrail;
sporeVaultDeathSmall.hitEffect = sporeBlockDeathHit;
sporeVaultDeathSmall.hitSound = Sounds.none;
sporeVaultDeathSmall.despawnEffect = Fx.wet;
sporeVaultDeathSmall.hitSize = 5;
sporeVaultDeathSmall.pierce = true;
sporeVaultDeathSmall.homingPower= 12;
sporeVaultDeathSmall.homingRange= 16;
sporeVaultDeathSmall.bulletSprite = "shell";
sporeVaultDeathSmall.frontColor = Color.valueOf("#42336f");
sporeVaultDeathSmall.backColor = Color.valueOf("#6d54b7");

const sporeVaultDeathLarge = extend(ArtilleryBulletType, {});

sporeVaultDeathLarge.speed = 10;
//this does 800 damage per 5 ticks btw.
sporeVaultDeathLarge.damage = 125;
sporeVaultDeathLarge.splashDamage = 800;
sporeVaultDeathLarge.splashDamageRadius = 120;
sporeVaultDeathLarge.bulletWidth = 10;
sporeVaultDeathLarge.bulletHeight = 15;
sporeVaultDeathLarge.bulletShrink = 0;
sporeVaultDeathLarge.hitShake = 0;
sporeVaultDeathLarge.lifetime = 50;
sporeVaultDeathLarge.collidesTiles = true;
sporeVaultDeathLarge.collides = true;
sporeVaultDeathLarge.collidesAir = true;
sporeVaultDeathLarge.trailEffect = sporeBlockDeathTrail;
sporeVaultDeathLarge.hitEffect = sporeBlockDeathHit;
sporeVaultDeathLarge.hitSound = Sounds.none;
sporeVaultDeathLarge.despawnEffect = Fx.wet;
sporeVaultDeathLarge.hitSize = 5;
sporeVaultDeathLarge.pierce = true;
sporeVaultDeathLarge.homingPower= 12;
sporeVaultDeathLarge.homingRange= 16;
sporeVaultDeathLarge.bulletSprite = "shell";
sporeVaultDeathLarge.frontColor = Color.valueOf("#42336f");
sporeVaultDeathLarge.backColor = Color.valueOf("#6d54b7");

const sporeVaultDeathExplode = newEffect(105, e => {
	alignGrad = 1;
	if (e.rotation < 0){
		alignGrad = e.fin();
		alignBhur = e.fout();
		alignAebg = 1;
	}
	else{
		alignGrad = e.fout();
		alignBhur = e.fin();
		alignAebg = -1;
	}
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignGrad);
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 4, 45 + e.rotation);
    }})
    Angles.randLenVectors(e.id, 3, 40 * e.fin(), e.rotation + Mathf.random(-5,5), 360, d);
	Draw.color(Color.valueOf("#6d54b7"), Color.valueOf("#995d9a"), alignBhur);
    const fg = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 32 + 1);
    }})
    Angles.randLenVectors(e.id, 10, 240 * e.fin() * alignAebg, e.rotation + Mathf.random(-5,5) + (40 * (alignGrad - alignBhur)), 360, fg);
});

const sporeVault = extendContent(Vault, "omnivault", {
	
    //OVERRIDE
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
        for(var i = 0; i < 25; i++){
		Effects.effect(sporeVaultDeathExplode, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
		}
		Effects.effect(Fx.impactShockwave, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
		Effects.shake(1.3, 1.3, tile.drawx(), tile.drawy());
        for(var j = 0; j < 150; j++){
            Calls.createBullet(sporeVaultDeathSmall, Team.derelict, tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.25, 1.0), Mathf.random(0.2, 1.0));
		}
        for(var k = 0; k < 75; k++){
            Calls.createBullet(sporeVaultDeathLarge, Team.derelict, tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.25, 1.0), Mathf.random(0.2, 1.0));
		}
	},
})
const darkSporePressUpdate = newEffect(27, e => {
	Draw.color(Color.valueOf("#cce9ff"), Color.valueOf("#007a96"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.square(e.x + x, e.y + y, e.fout() * 2, 45 + Mathf.random(-15,15));
    }})
    Angles.randLenVectors(e.id, 3, 1 + e.fin() * 6, d);
});
const darkSporePressCraft = newEffect(30, e => {
    Draw.color(Color.valueOf("#cce9ff"), Color.valueOf("#007a96"), e.fin());
    Lines.stroke(e.fout() * 5); //line thickness goes from 3 to 0
    Lines.circle(e.x, e.y, 10 + e.fin() * 30);
	Draw.color(Color.valueOf("#9f81db"), Color.valueOf("#008fc4"), e.fin());
    const rg = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, e.fout() * Mathf.random(1,2));
    }})
    Angles.randLenVectors(e.id, 5, -6 + e.fin() * 24, e.rotation + (e.fin() * Mathf.random(-45,45)), 360, rg);
});
const darkSporePress = extendContent(GenericCrafter, "dark-sporepress", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());
		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find("diamond-ore-dark-sporepress-liquid"), tile.drawx(), tile.drawy());
		Draw.reset();
	}
});
darkSporePress.updateEffect = darkSporePressUpdate;
darkSporePress.craftEffect = darkSporePressCraft;
// UNUSED / BROKEN
/* extendContent(UnitFactory, "spore-dagger-factory", {
	init(){ 
	this.super$init();
	},
	draw(tile){
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy());
		if (tile.entity.cons.valid()){
		growTime += tile.entity.delta() * tile.entity.efficiency() * Vars.state.rules.unitBuildSpeedMultiplier;
		};
		try{
			spawnProgress = (growTime / this.produceTime);
		}
		catch(error){
			growTime = 0;
			spawnProgress = 0;
		}
		embryo = Core.atlas.find(this.unitType);
		if (spawnProgress > 0.1){
			if (spawnProgress < 0.7){
				Draw.alpha(spawnProgress * 0.7);
			}
			else{
				Draw.alpha((1 - spawnProgress) * 0.3);
			}
			Draw.rect(Core.atlas.find(this.name + "-sludge"), tile.drawx(), tile.drawy(), (spawnProgress * 360) + Mathf.random(-9,9));
		}
		Draw.alpha(Math.max(((spawnProgress * 2) - 1.4), 0));
		Draw.rect(embryo, tile.drawx(), tile.drawy());
		Draw.alpha(1);
		if (spawnProgress < 0.04){
			Draw.rect(Core.atlas.find(this.name + "-bud-burst"), tile.drawx(), tile.drawy());
		}
		else if (spawnProgress < 0.1){
			Draw.rect(Core.atlas.find(this.name + "-bud-young"), tile.drawx(), tile.drawy());
		}
		else if (spawnProgress < 0.25){
			Draw.rect(Core.atlas.find(this.name + "-bud-immature"), tile.drawx(), tile.drawy());
		}
		else if (spawnProgress < 1){
			Draw.rect(Core.atlas.find(this.name + "-bud-mature"), tile.drawx(), tile.drawy());
		}
		else{
			growTime = 0;
			Sounds.laser.at(tile);
			for(var k = 0; k < 7; k++){
				Effects.effect(sporeUnitBirth, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
			};
		}
		Draw.reset();
	},
	onDestroyed: function(tile){
		this.super$onDestroyed(tile);
		//const entity = tile.entity
		if (growTime != null){
			growth = Math.floor(((growTime / this.produceTime) * 30) + 8);
		}
		else{
			growth = 8;
		}
        for(var i = 0; i < growth; i++){
            Calls.createBullet(sporeBlockDeath, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.45, 1.0), Mathf.random(0.75, 1.50));
		}
        for(var k = 0; k < 7; k++){
			Effects.effect(sporeBlockDeathFx, tile.drawx(), tile.drawy(), Mathf.random(-360,360));
		}
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name)
        ];
    }
}); */