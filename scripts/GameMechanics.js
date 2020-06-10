// This will be a game later, for now on, it allows to play the mechanics of the scene

const GAME = {
    SpawnGameboy: () => {
        let gameboy = BUILD.Gameboy(1, 0, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, -7.70, 0.825, 5)

        ANIMATION.MoveGameboy(gameboy, 1, 5)

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 1)
            ANIMATION.Working(worker1)
        }, factorySpeed * 5);

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 1, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 0)
            }, factorySpeed / 8)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 5)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 0, 4)
        }, factorySpeed * 6 )

        //

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 0)
            ANIMATION.Working(worker2)
        }, factorySpeed * 10)

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 2, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 1)
            }, factorySpeed / 8)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 10)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 1, 2)
        }, factorySpeed * 11 )
        
        //

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 2)
            ANIMATION.Working(worker3)
        }, factorySpeed * 13)

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 3, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 2)
            }, factorySpeed / 8)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 13)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 2, 4)
        }, factorySpeed * 14 )

        //

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 3)
            ANIMATION.Working(worker4)
        }, factorySpeed * 18)

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 4, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 1)
            }, factorySpeed / 8)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 18)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 1, 3)
        }, factorySpeed * 19 )

        //

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 1)
            ANIMATION.Working(worker5)
        }, factorySpeed * 22)

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 5, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 0)
            }, factorySpeed / 32)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 22)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 0, 9)
        }, factorySpeed * 23)

        //

        setTimeout(() => {
            ANIMATION.RetrieveGameboy(gameboy, 4)
            ANIMATION.Working(worker6)
        }, factorySpeed * 32)

        setTimeout(() => {
            scene.remove(gameboy)
            gameboy = BUILD.Gameboy(1, 6, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, gameboy.position.x, gameboy.position.y, gameboy.position.z)

            setTimeout(() => {
                ANIMATION.LaunchGameboy(gameboy, 3)
            }, factorySpeed / 8)
            
        }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed * 32)

        setTimeout(() => {
            ANIMATION.MoveGameboy(gameboy, 3, 6)
        }, factorySpeed * 33)

        setTimeout(() => {
            GAME.CatchGameboy(gameboy.position.x, gameboy.position.y, gameboy.position.z)
            scene.remove(gameboy)
            return true
        }, factorySpeed * 38.8)
        
    },
    CatchGameboy: (x,y,z) => {
        const gameboy = BUILD.Gameboy(1, 6, 0xdddddd, 0x176e17, 0x176e17, 0xffd247, 0x282828, 0xdd1111, 0x565563, x, y, z)
        const usedClaw = ANIMATION.ClawGrab(activeClaw)
        setTimeout(() => {
            gameboy.position.set(0,-0.4,0)
            usedClaw.add(gameboy)
        }, factorySpeed/5)

        setTimeout(() => {
            ANIMATION.DropClaw(usedClaw, gameboy)
        }, factorySpeed + (factorySpeed / 2))
    },
    SummonContainer: () => {
        setTimeout(() => {
            activeBoat.add(BUILD.Container(1, activeContainers, containerColors[Math.floor(Math.random()*containerColors.length)]))

        activeContainers += 1
        }, factorySpeed / 10)
    },
    SpawnBoat: () => {
        if (activeBoat != null) {
            ANIMATION.LeaveBoat(activeBoat)
        }
        isBoat = false
        activeContainers = 0
        activeBoat = BUILD.Boat(1, 1, 100, -4, -11, 12.5)
        ANIMATION.EnterBoat(activeBoat)
    }
}