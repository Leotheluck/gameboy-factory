// Animations for the scene

const ANIMATION = {
    Pusher: (pusher, direction) => {
        pusher.position.x = 0
        pusher.position.z = 0

        const firstCoords = {y: -0.2}
        const pusherUp = new TWEEN.Tween(firstCoords)
        pusherUp.to({ y: 0}, factorySpeed / 5)
        pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        pusherUp.onUpdate(() => {
                pusher.position.y = firstCoords.y
            })
        pusherUp.start();

        setTimeout(() => {
            SOUNDFX.Conveyors(0.3)
            const secondCoords = {pos: 0}
            const pusherUp = new TWEEN.Tween(secondCoords)
            pusherUp.to({ pos: 1}, (factorySpeed * 3) / 5) 
            pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            pusherUp.onUpdate(() => { 
                    if (direction === 0) {
                        pusher.position.z = - secondCoords.pos
                    } else if (direction === 1) {
                        pusher.position.x = secondCoords.pos
                    } else if (direction === 2) {
                        pusher.position.z = secondCoords.pos
                    } else if (direction === 3) {
                        pusher.position.x = - secondCoords.pos
                    }
                })
            pusherUp.start();
        }, factorySpeed / 5);

        setTimeout(() => {
            const thirdCoords = {y: 0}
            const pusherUp = new TWEEN.Tween(thirdCoords)
            pusherUp.to({ y: -0.2}, factorySpeed / 5)
            pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            pusherUp.onUpdate(() => {
                    pusher.position.y = thirdCoords.y
                })
            pusherUp.start();
        }, (factorySpeed / 5) * 4);
    },
    CompensatePusher: (pusher, direction) => {
        setTimeout(() => {
            pusher.position.y = -0.5
        }, factorySpeed / 5);

        setTimeout(() => {
            pusher.position.y = 0
        }, (factorySpeed / 5) * 4);
    },
    Waves: (sea, size) => {
        SOUNDFX.Wave(Math.random() * 0.05)

        setTimeout(() => {
            SOUNDFX.Wave(Math.random() * 0.05)
        }, factorySpeed)

        for (let i = 0; i < size * 2; i++) {
            if (i % 2 === 1) {
                const coords = {y: -0.5}
                const WavesUp = new TWEEN.Tween(coords)
                WavesUp.to({ y: 0.5}, factorySpeed)
                WavesUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                WavesUp.onUpdate(() => {
                        sea.children[i].position.y = coords.y
                    })
                WavesUp.start()

                setTimeout(() => {
                    const coords = {y: 0.5}
                    const WavesDown = new TWEEN.Tween(coords)
                    WavesDown.to({ y: -0.5}, factorySpeed)
                    WavesDown.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    WavesDown.onUpdate(() => {
                            sea.children[i].position.y = coords.y
                        })
                    WavesDown.start()
                }, factorySpeed)
            } else {
                const coords = {y: 0.5}
                const WavesDown = new TWEEN.Tween(coords)
                WavesDown.to({ y: -0.5}, factorySpeed)
                WavesDown.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                WavesDown.onUpdate(() => {
                        sea.children[i].position.y = coords.y
                    })
                WavesDown.start()

                setTimeout(() => {
                    const coords = {y: -0.5}
                    const WavesUp = new TWEEN.Tween(coords)
                    WavesUp.to({ y: 0.5}, factorySpeed)
                    WavesUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    WavesUp.onUpdate(() => {
                            sea.children[i].position.y = coords.y
                        })
                    WavesUp.start()
                }, factorySpeed)
            }
        }

        const seaCoords = {y: 120}
        const MoveSea = new TWEEN.Tween(seaCoords)
        MoveSea.to({ y: 114}, factorySpeed * 2)
        MoveSea.onUpdate(() => {
                sea.position.z = seaCoords.y
            })
        MoveSea.start()

        setTimeout(() => {
            sea.position.z = 120
        }, factorySpeed * 2);
        
        setTimeout(() => {
            ANIMATION.Waves(sea, size)
        }, factorySpeed * 2)
    },
    Working: (worker) => {
        {
            const coords = {x: - THREE.Math.degToRad(10)}
            const pusherUp = new TWEEN.Tween(coords)
            pusherUp.to({ x: - THREE.Math.degToRad(15)}, factorySpeed / 5)
            pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            pusherUp.onUpdate(() => {
                    worker.children[21].rotation.x = coords.x
                })
            pusherUp.start()
        }

        {
            const coords = {x: THREE.Math.degToRad(0)}
            const pusherUp = new TWEEN.Tween(coords)
            pusherUp.to({ x: THREE.Math.degToRad(15)}, factorySpeed / 5)
            pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            pusherUp.onUpdate(() => {
                    worker.children[21].rotation.y = coords.x
                })
            pusherUp.start()
        }

        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(15)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(0)}, factorySpeed / 5)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[21].rotation.y = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 5)
        }

        {
            setTimeout(() => {
                const coords = {x: - THREE.Math.degToRad(15)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: - THREE.Math.degToRad(10)}, factorySpeed / 5)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[21].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed / 5)
        }

        {
            setTimeout(() => {
                const coords = {x: 0}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: Math.PI / 6}, factorySpeed / 5)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[18].rotation.z = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8)
        }

        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(55)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(150)}, factorySpeed / 5)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[18].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5)
        }

        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(150)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(55)}, factorySpeed / 8)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[18].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5)
        }

        {
            setTimeout(() => {
                const coords = {x: Math.PI / 6}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: 0}, factorySpeed / 8)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[18].rotation.z = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed / 8)
        }

        {
            setTimeout(() => {
                const coords = {x: 0}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: Math.PI / 6}, factorySpeed / 3)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[19].rotation.z = - coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8)
        }

        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(55)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(45)}, factorySpeed / 3)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[19].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8)
        }
        
        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(45)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(60)}, factorySpeed / 8)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[19].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed / 7)
        }

        {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(60)}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: THREE.Math.degToRad(55)}, factorySpeed / 13)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[19].rotation.x = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed / 7 + factorySpeed / 8)
        }

        {
            setTimeout(() => {
                const coords = {x: - Math.PI / 6}
                const pusherUp = new TWEEN.Tween(coords)
                pusherUp.to({ x: 0}, factorySpeed / 13)
                pusherUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                pusherUp.onUpdate(() => {
                        worker.children[19].rotation.z = coords.x
                    })
                pusherUp.start()
            }, factorySpeed / 8 + factorySpeed / 5 + factorySpeed / 5 + factorySpeed / 8 + factorySpeed / 7 + factorySpeed / 8)
        }
    },
    MoveGameboy: (gameboy, direction, times) => {
        for(let i = 0; i < times; i++) {
            setTimeout(() => {
                const coords = {x: 0}
                if (direction === 0) {
                    coords.x = gameboy.position.z
                } else if (direction === 1) {
                    coords.x = gameboy.position.x
                } else if (direction === 2) {
                    coords.x = gameboy.position.z
                } else if (direction === 3) {
                    coords.x = gameboy.position.x
                }
                const moveGameboy = new TWEEN.Tween(coords)
                let objective
                if (direction === 0) {
                    objective = gameboy.position.z - 1
                } else if (direction === 1) {
                    objective = gameboy.position.x + 1
                } else if (direction === 2) {
                    objective = gameboy.position.z + 1
                } else if (direction === 3) {
                    objective = gameboy.position.x - 1
                }
                moveGameboy.to({ x: objective}, (factorySpeed * 3) / 5) 
                moveGameboy.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                moveGameboy.onUpdate(() => { 
                        if (direction === 0) {
                            gameboy.position.z = coords.x
                        } else if (direction === 1) {
                            gameboy.position.x = coords.x
                        } else if (direction === 2) {
                            gameboy.position.z = coords.x
                        } else if (direction === 3) {
                            gameboy.position.x = coords.x
                        }
                    })
                moveGameboy.start();
            }, factorySpeed / 5 + (i*factorySpeed));
        }
    },
    RetrieveGameboy: (gameboy, direction) => {
        setTimeout(() => {
            const coords = {x: gameboy.position.x, z: gameboy.position.z}

            let objectiveX
            let objectiveZ
            if (direction === 0) {
                objectiveX = gameboy.position.x - 0.25
                objectiveZ = gameboy.position.z - 0.5
            } else if (direction === 1) {
                objectiveX = gameboy.position.x + 0.5
                objectiveZ = gameboy.position.z + 0.25
            } else if (direction === 2) {
                objectiveX = gameboy.position.x + 0.5
                objectiveZ = gameboy.position.z - 0.25
            } else if (direction === 3) {
                objectiveX = gameboy.position.x - 0.25
                objectiveZ = gameboy.position.z + 0.5
            } else if (direction === 4) {
                objectiveX = gameboy.position.x + 0.25
                objectiveZ = gameboy.position.z - 0.4
            }

            const retrieveGameboy = new TWEEN.Tween(coords)
            retrieveGameboy.to({ x: objectiveX, z: objectiveZ}, factorySpeed / 5) 
            retrieveGameboy.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            retrieveGameboy.onUpdate(() => { 
                    gameboy.position.x = coords.x
                    gameboy.position.z = coords.z
                })
            retrieveGameboy.start();
        }, factorySpeed / 8);
    },
    LaunchGameboy: (gameboy, direction) => {
        setTimeout(() => {
            const coords = {x: 0}
            if (direction === 0) {
                coords.x = gameboy.position.z
            } else if (direction === 1) {
                coords.x = gameboy.position.x
            } else if (direction === 2) {
                coords.x = gameboy.position.z
            } else if (direction === 3) {
                coords.x = gameboy.position.x
            }

            const launchGameboy = new TWEEN.Tween(coords)
            let objective
            if (direction === 0) {
                objective = gameboy.position.z - 1.42
            } else if (direction === 1) {
                objective = gameboy.position.x + 1.25
            } else if (direction === 2) {
                objective = gameboy.position.z + 1.45
            } else if (direction === 3) {
                objective = gameboy.position.x - 1.35
            }
            launchGameboy.to({ x: objective }, factorySpeed / 8) 
            launchGameboy.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            launchGameboy.onUpdate(() => { 
                    if (direction === 0) {
                        gameboy.position.z = coords.x
                    } else if (direction === 1) {
                        gameboy.position.x = coords.x
                    } else if (direction === 2) {
                        gameboy.position.z = coords.x
                    } else if (direction === 3) {
                        gameboy.position.x = coords.x
                    }
                })
            launchGameboy.start();
        }, factorySpeed / 8);
    },
    FactoryDoor: (door) => {

        for (let i = 0; i < 17; i++) {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(15)}
                const doorMove = new TWEEN.Tween(coords)
                doorMove.to({ x: THREE.Math.degToRad(0)}, (Math.random() * (factorySpeed / 5 * 2)))
                doorMove.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                doorMove.onUpdate(() => {
                        door.children[i].rotation.z = coords.x
                    })
                doorMove.start();
            }, factorySpeed / 5 * 1.2)
        }

        setTimeout(() => {
            const coords = {x: 1.05}
            const doorMove = new TWEEN.Tween(coords)
            doorMove.to({ x: 0.95}, (factorySpeed / 5))
            doorMove.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            doorMove.onUpdate(() => {
                    door.position.x = coords.x
                })
            doorMove.start();
        }, factorySpeed / 5 * 1.2)


        for (let i = 0; i < 17; i++) {
            setTimeout(() => {
                const coords = {x: THREE.Math.degToRad(0)}
                const doorMove = new TWEEN.Tween(coords)
                doorMove.to({ x: THREE.Math.degToRad(15)}, factorySpeed / 5)
                doorMove.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                doorMove.onUpdate(() => {
                        door.children[i].rotation.z = coords.x
                    })
                doorMove.start();
            }, (factorySpeed / 5) * 2.5 )
        }

        setTimeout(() => {
            const coords = {x: 0.95}
            const doorMove = new TWEEN.Tween(coords)
            doorMove.to({ x: 1.05}, (factorySpeed / 5))
            doorMove.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            doorMove.onUpdate(() => {
                    door.position.x = coords.x
                })
            doorMove.start();
        }, (factorySpeed / 5) * 2.8)
    },
    RotateCrane: (crane) => {
        if (activeClaw >= 3) {
            activeClaw = 0
        } else {
            activeClaw += 1
        }

        const coords = {x: THREE.Math.degToRad(-90 * (activeClaw - 1))}
        const craneMove = new TWEEN.Tween(coords)
        craneMove.to({ x: THREE.Math.degToRad(- activeClaw * 90)}, (factorySpeed / 5) * 2.5)
        craneMove.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        craneMove.onUpdate(() => {
                crane.children[1].children[2].rotation.y = coords.x
            })
        craneMove.start()
    },
    ClawGrab: (claw) => {
        let clawElement = null
        let wireElement = null
        if (claw === 0) {
            clawElement = crane.children[1].children[2].children[11].children[0]
            wireElement = crane.children[1].children[2].children[11].children[1]
        } else if (claw === 1) {
            clawElement = crane.children[1].children[2].children[8].children[0]
            wireElement = crane.children[1].children[2].children[8].children[1]
        } else if (claw === 2) {
            clawElement = crane.children[1].children[2].children[9].children[0]
            wireElement = crane.children[1].children[2].children[9].children[1]
        } else if (claw === 3) {
            clawElement = crane.children[1].children[2].children[10].children[0]
            wireElement = crane.children[1].children[2].children[10].children[1]
        }

        setTimeout(() => {
            const coords = {x: 1}
            const clawDown = new TWEEN.Tween(coords)
            clawDown.to({ x: 0.35}, (factorySpeed / 10))
            clawDown.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            clawDown.onUpdate(() => {
                    clawElement.position.y = coords.x
                })
            clawDown.start()

            const wireCoords = {x: 2, z: 1}
            const wireDown = new TWEEN.Tween(wireCoords)
            wireDown.to({ x: 1.625, z: 1.275}, (factorySpeed / 10))
            wireDown.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            wireDown.onUpdate(() => {
                    wireElement.position.y = wireCoords.x
                    wireElement.scale.y = wireCoords.z
                })
            wireDown.start()
    
            setTimeout(() => {
                const coords = { z: THREE.Math.degToRad(-20)}
                const clawDown = new TWEEN.Tween(coords)
                clawDown.to({ z: THREE.Math.degToRad(-65) }, (factorySpeed / 10))
                clawDown.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                clawDown.onUpdate(() => {
                        clawElement.children[0].children[1].rotation.z = coords.z
                        clawElement.children[1].children[1].rotation.z = coords.z
                        clawElement.children[2].children[1].rotation.z = coords.z
                    })
                clawDown.start()
            }, factorySpeed / 10)

            setTimeout(() => {
                const coords = {x: 0.35}
                const clawUp = new TWEEN.Tween(coords)
                clawUp.to({ x: 1}, (factorySpeed / 10))
                clawUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                clawUp.onUpdate(() => {
                        clawElement.position.y = coords.x
                    })
                clawUp.start()

                const wireCoords = {x: 1.625, z: 1.275}
                const wireUp = new TWEEN.Tween(wireCoords)
                wireUp.to({ x: 2, z: 1}, (factorySpeed / 10))
                wireUp.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                wireUp.onUpdate(() => {
                        wireElement.position.y = wireCoords.x
                        wireElement.scale.y = wireCoords.z
                    })
                wireUp.start()
            }, (factorySpeed / 5))
            
        }, 1)

        return clawElement
    },
    DropClaw: (claw, gameboy) => {
        const coords = { z: THREE.Math.degToRad(-65)}
        const clawOpen = new TWEEN.Tween(coords)
        clawOpen.to({ z: THREE.Math.degToRad(-20) }, (factorySpeed / 10))
        clawOpen.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        clawOpen.onUpdate(() => {
                claw.children[0].children[1].rotation.z = coords.z
                claw.children[1].children[1].rotation.z = coords.z
                claw.children[2].children[1].rotation.z = coords.z
            })
        clawOpen.start()

        setTimeout(() => {
            const coords = { z: -0.4}
            const clawOpen = new TWEEN.Tween(coords)
            clawOpen.to({ z: -5 }, (factorySpeed / 10))
            clawOpen.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            clawOpen.onUpdate(() => {
                    gameboy.position.y = coords.z
                })
            clawOpen.start()

            if (isBoat && (activeContainers < boatMax)) {
                GAME.SummonContainer()
            }

            setTimeout(() => {
                claw.remove(gameboy)
                scene.remove(gameboy)
            }, factorySpeed / 10)
        }, factorySpeed / 25)
    },
    LeaveBoat: (boat) => {
        const coords = { z: boat.position.x}
        const leaveBoat = new TWEEN.Tween(coords)
        leaveBoat.to({ z: -100 }, (factorySpeed * 3))
        leaveBoat.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        leaveBoat.onUpdate(() => {
                boat.position.x = coords.z
            })
        leaveBoat.start()

        setTimeout(() => {
            scene.remove(boat)
        }, factorySpeed * 3)
    },
    EnterBoat: (boat) => {
        const coords = { z: boat.position.x}
        const leaveBoat = new TWEEN.Tween(coords)
        leaveBoat.to({ z: -6 }, (factorySpeed * 3))
        leaveBoat.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        leaveBoat.onUpdate(() => {
                boat.position.x = coords.z
            })
        leaveBoat.start()

        setTimeout(() => {
            isBoat = true
        }, factorySpeed * 3)
    }
}