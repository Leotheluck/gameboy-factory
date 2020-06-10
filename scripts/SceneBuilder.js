// Building the 3D elements of the scene

const BUILD = {
    FactoryBase: (size, color, color2, posX, posY, posZ) => {
        const factoryBase = new THREE.Group()

        //

        const baseGeometry = new THREE.BoxGeometry(size * 20, size * 2, size * 16)
        const baseMaterial = new THREE.MeshPhongMaterial({ color: color })
        const base = new THREE.Mesh(baseGeometry, baseMaterial)
    
        base.receiveShadow = true
        base.castShadow = true
        base.position.set(0, 0, 0)

        factoryBase.add(base)

        //

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                const factoryPillar = new THREE.Group()

                //

                const pillarBaseGeometry = new THREE.CylinderGeometry(size * 0.75, size * 0.75, size * 6, 10)
                const pillarBaseMaterial = new THREE.MeshPhongMaterial({ color: color, flatShading: true })
                const pillarBase = new THREE.Mesh(pillarBaseGeometry, pillarBaseMaterial)
            
                pillarBase.receiveShadow = true
                pillarBase.castShadow = true
                pillarBase.position.set(0, 0, 0)

                factoryPillar.add(pillarBase)

                //

                const pillarFrameGeometry = new THREE.CylinderGeometry(size * 0.9, size * 0.9, size * 1, 10)
                const pillarFrameMaterial = new THREE.MeshPhongMaterial({ color: palette.emissive, wireframe: true})
                const pillarFrame = new THREE.Mesh(pillarFrameGeometry, pillarFrameMaterial)
            
                pillarFrame.receiveShadow = true
                pillarFrame.castShadow = true
                pillarFrame.position.set(0, 0, 0)

                factoryPillar.add(pillarFrame)

                //

                factoryPillar.position.set((size * (-8)) + (i * size * 8), size * -2.5, (size * 6.5) - (j * size * 13))

                factoryBase.add(factoryPillar)
            }
        }

        //

        const extensionGeometry = new THREE.BoxGeometry(size * 4, size * 1.75, size * 10)
        const extensionMaterial = new THREE.MeshPhongMaterial({ color: color2 })
        const extension = new THREE.Mesh(extensionGeometry, extensionMaterial)
    
        extension.receiveShadow = true
        extension.castShadow = true
        extension.position.set(size * 10.5, 0, 0)

        factoryBase.add(extension)

        //

        for (let i = 0; i < 2; i++) {
            const triangleGeometry = new THREE.BoxGeometry(size * 4, size * 1.75, size * 4)
            const triangleMaterial = new THREE.MeshPhongMaterial({ color: color2 })
            const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial)
        
            triangle.receiveShadow = true
            triangle.castShadow = true
            triangle.position.set(size * 10, 0, size * 5 - (i*size*10))
            triangle.rotation.y = THREE.Math.degToRad(45)

            factoryBase.add(triangle)
        }

        //

        factoryBase.position.set(posX, posY, posZ)

        scene.add(factoryBase)

        return factoryBase
    },
    Conveyor: (
        sizeX, // Value :: Length of the conveyor
        sizeY, // Value :: Height of the conveyor (Y position is calculated from the height)
        sizeZ, // Value :: Width of the conveyor
        color, // Color :: Color of the conveyor
        posX, // Value :: X position of the conveyor
        posZ, // Value :: Z position of the conveyor
        rotation // Boolean :: Should the conveyor be rotated by 90° ?
    ) => {
        const conveyorGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ)
        const conveyorMaterial = new THREE.MeshPhongMaterial({ color: color })
        const conveyor = new THREE.Mesh(conveyorGeometry, conveyorMaterial)
    
        conveyor.receiveShadow = true
        conveyor.castShadow = true
        conveyor.position.set(posX, sizeY / 2, posZ)
    
        if(rotation) {
            conveyor.rotation.y = Math.PI / 2
        }
    
        scene.add(conveyor)

        return conveyor
    },
    Belt: (
        sizeX, // Value :: Length of the belt
        sizeY, // Value :: Height of the belt
        sizeZ, // Value :: Width of the belt
        color, // Color :: Color of the belt
        posX, // Value :: X position of the belt
        posZ, // Value :: Z position of the belt
        rotation // Boolean :: Should the conveyor be rotated by 90° ?
    ) => {
        const beltGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ)
        const beltMaterial = new THREE.MeshPhongMaterial({ color: color })
        const belt = new THREE.Mesh(beltGeometry, beltMaterial)

        belt.receiveShadow = true
        belt.castShadow = true
        belt.position.set(posX, 0.8, posZ)

        if(rotation) {
            belt.rotation.y = Math.PI / 2
        }

        scene.add(belt)
    },
    Pusher: (
        sizeX, // Value :: Width of the pusher
        sizeY, // Value :: Height of the pusher
        sizeZ, // Value :: Length of the pusher
        color, // Color :: Color of the pusher
        emissive, // Color :: Reflective color of the pusher
        posX, // Value :: X position of the pusher
        posZ, // Value :: Z position of the pusher
        quantity, // Value :: Number of pushers to be generated
        direction // Value :: Direction of the pushers, 0 - North / 1 - East / 2 - South / 3 - West
    ) => {
        const pushers = new THREE.Group()

        for(let i = 0; i < quantity; i++) {
            const pusherGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ)
            let pusherMaterial = new THREE.MeshStandardMaterial({ color: color, emissive: emissive, roughness: 0.3, metalness: 1 })
            const pusher = new THREE.Mesh(pusherGeometry, pusherMaterial)

            pusher.receiveShadow = true
            pusher.castShadow = true

            if (direction === 0) {
                pusher.rotation.y = Math.PI / 2
                pusher.position.set(posX, 0.825, posZ - i)
            } else if (direction === 1) {
                pusher.position.set(posX + i, 0.825, posZ)
            } else if (direction === 2) {
                pusher.rotation.y = Math.PI / 2
                pusher.position.set(posX, 0.825, posZ + i)
            } else if (direction === 3) {
                pusher.position.set(posX - i, 0.825, posZ)
            }

            pushers.add(pusher)
        }

        scene.add(pushers)

        return pushers
    },
    WorkBox: (
        sizeX, // Value :: Length of the workbox
        sizeY, // Value :: Height of the workbox (Y position is calculated from the height)
        sizeZ, // Value :: Width of the workbox
        color, // Color :: Color of the workbox
        emissive, // Color :: Reflective color of the pusher
        posX, // Value :: X position of the workbox
        posZ, // Value :: Z position of the workbox
        type // Value :: Direction of the pushers, 0 - North / 1 - East / 2 - South / 3 - West
    ) => {
        const workboxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ)
        const workboxMaterial = new THREE.MeshStandardMaterial({ color: color, emissive: emissive, roughness: 0.3, metalness: 1 , wireframe: true})
        const workbox = new THREE.Mesh(workboxGeometry, workboxMaterial)
    
        workbox.receiveShadow = true
        workbox.castShadow = true
        workbox.position.set(posX, (sizeY / 2), posZ)
    
        scene.add(workbox)

        return workbox
    },
    Worker: (
        size,
        color, 
        emissive, 
        posX, 
        posY,
        posZ,
        direction
    ) => {
        const worker = new THREE.Group()

        for (let i = 0; i < 2; i++) {
            const footGeometry = new THREE.BoxGeometry(size / 4, size / 6, size / 3)
            const footMaterial = new THREE.MeshPhongMaterial({color: color})
            const foot = new THREE.Mesh(footGeometry, footMaterial)

            foot.position.set((-size / 4) + (i * size) / 2, -size / 3, 0)

            foot.receiveShadow = true
            foot.castShadow = true

            worker.add(foot)
        }

        for (let i = 0; i < 2; i++) {
            const legGeometry = new THREE.BoxGeometry(size / 8, size / 1.375, size / 8)
            const legMaterial = new THREE.MeshPhongMaterial({color: 0x373737})
            const leg = new THREE.Mesh(legGeometry, legMaterial)

            leg.position.set((-size / 4) + (i * size) / 2, 0, size / 8)

            leg.receiveShadow = true
            leg.castShadow = true

            worker.add(leg)
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                const legAntennaGeometry = new THREE.BoxGeometry(size / 6, size / 32, size / 6)
                const legAntennaMaterial = new THREE.MeshPhongMaterial({color: color})
                const legAntenna = new THREE.Mesh(legAntennaGeometry, legAntennaMaterial)

                legAntenna.position.set((-size / 4) + (i * size) / 2, (-size / 5) + (j*size) / 12, size / 8)

                legAntenna.receiveShadow = true
                legAntenna.castShadow = true

                worker.add(legAntenna)
            }
        }

        for (let i = 0; i < 2; i++) {
            const thighGeometry = new THREE.BoxGeometry(size / 5, size / 6, size / 5)
            const thighMaterial = new THREE.MeshPhongMaterial({color: color})
            const thigh = new THREE.Mesh(thighGeometry, thighMaterial)

            thigh.position.set((-size / 4) + (i * size) / 2, size / 3.5, size / 8)

            thigh.receiveShadow = true
            thigh.castShadow = true

            worker.add(thigh)
        }

        //

        const coreGeometry = new THREE.BoxGeometry(size / 1.25, size / 1.5, size / 3)
        const coreMaterial = new THREE.MeshPhongMaterial({color: color})
        const core = new THREE.Mesh(coreGeometry, coreMaterial)

        core.position.set(0, size / 1.5, size / 8)

        core.receiveShadow = true
        core.castShadow = true

        worker.add(core)

        //

        const coreMetalGeometry = new THREE.BoxGeometry(size / 2, size / 2, size / 16)
        const coreMetalMaterial = new THREE.MeshStandardMaterial({ color: color, emissive: 0xe6b91b, roughness: 0.3, metalness: 1 })
        const coreMetal = new THREE.Mesh(coreMetalGeometry, coreMetalMaterial)

        coreMetal.position.set(0, size / 1.5, -size / 32)

        coreMetal.receiveShadow = true
        coreMetal.castShadow = true

        worker.add(coreMetal)

        //

        const leftArm = new THREE.Group()
        const rightArm = new THREE.Group()

        for (let i = 0; i < 2; i++) {
            const armGeometry = new THREE.BoxGeometry(size / 8, size / 1.5, size / 8)
            const armMaterial = new THREE.MeshPhongMaterial({ color: 0x373737 })
            const arm = new THREE.Mesh(armGeometry, armMaterial)

            arm.position.set(0, -size / 3, 0)

            arm.receiveShadow = true
            arm.castShadow = true

            if (i === 0) {
                leftArm.add(arm)
            } else if (i === 1) {
                rightArm.add(arm)
            }
        }

        for (let i = 0; i < 2; i++) {
            const shoulderGeometry = new THREE.BoxGeometry(size / 6, size / 6, size / 6)
            const shoulderMaterial = new THREE.MeshPhongMaterial({ color: color })
            const shoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial)

            shoulder.position.set(0, 0, 0)
            shoulder.rotation.z = Math.PI / 4

            shoulder.receiveShadow = true
            shoulder.castShadow = true

            if (i === 0) {
                leftArm.add(shoulder)
            } else if (i === 1) {
                rightArm.add(shoulder)
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 6; j++) {
                const armAntennaGeometry = new THREE.BoxGeometry(size / 6, size / 32, size / 6)
                const armAntennaMaterial = new THREE.MeshPhongMaterial({color: color})
                const armAntenna = new THREE.Mesh(armAntennaGeometry, armAntennaMaterial)

                armAntenna.position.set(0, (-size / 6) - (j*size) / 12, 0)

                armAntenna.receiveShadow = true
                armAntenna.castShadow = true

                if (i === 0) {
                    leftArm.add(armAntenna)
                } else if (i === 1) {
                    rightArm.add(armAntenna)
                }
            }
        }

        for (let i = 0; i < 2; i++) {
            const wristGeometry = new THREE.BoxGeometry(size / 16, size / 6, size / 16)
            const wristMaterial = new THREE.MeshPhongMaterial({ color: color })
            const wrist = new THREE.Mesh(wristGeometry, wristMaterial)

            wrist.position.set(0, -size / 1.5, 0)

            wrist.receiveShadow = true
            wrist.castShadow = true

            if (i === 0) {
                leftArm.add(wrist)
            } else if (i === 1) {
                rightArm.add(wrist)
            }
        }

        for (let i = 0; i < 2; i++) {
            const handGeometry = new THREE.BoxGeometry(size / 6, size / 32, size / 16)
            const handMaterial = new THREE.MeshPhongMaterial({ color: color })
            const hand = new THREE.Mesh(handGeometry, handMaterial)

            hand.position.set(0, -size / 1.35, 0)

            hand.receiveShadow = true
            hand.castShadow = true

            if (i === 0) {
                hand.rotation.y = Math.PI / 2
                leftArm.add(hand)
            } else if (i === 1) {
                rightArm.add(hand)
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const fingerGeometry = new THREE.BoxGeometry(size / 16, size / 8, size / 16)
                const fingerMaterial = new THREE.MeshPhongMaterial({color: color})
                const finger = new THREE.Mesh(fingerGeometry, fingerMaterial)

                finger.position.set((-size / 16) + ((j*size) / 8), -size / 1.25, 0)

                finger.receiveShadow = true
                finger.castShadow = true

                if (i === 0) {
                    leftArm.add(finger)
                    finger.position.set(0, -size / 1.25, (-size / 16) + ((j*size) / 8))
                } else if (i === 1) {
                    rightArm.add(finger)
                }
            }
        }

        //  

        leftArm.rotation.x = THREE.Math.degToRad(55)
        rightArm.rotation.x = THREE.Math.degToRad(55)

        leftArm.position.set(-size / 2, size / 1.125, size / 8)   
        rightArm.position.set(size / 2, size / 1.125, size / 8) 

        worker.add(leftArm)
        worker.add(rightArm)

        //

        const neckGeometry = new THREE.BoxGeometry(size / 4, size / 3, size / 6)
        const neckMaterial = new THREE.MeshPhongMaterial({color: color})
        const neck = new THREE.Mesh(neckGeometry, neckMaterial)

        neck.position.set(0, size, size / 8)

        neck.receiveShadow = true
        neck.castShadow = true

        worker.add(neck)

        //

        const head = new THREE.Group()

        //

        const faceGeometry = new THREE.BoxGeometry(size / 2, size / 3, size / 2.5)
        const faceMaterial = new THREE.MeshPhongMaterial({color: color})
        const face = new THREE.Mesh(faceGeometry, faceMaterial)

        face.position.set(0, 0, 0)

        face.receiveShadow = true
        face.castShadow = true

        head.add(face)

        //

        for (let i = 0; i < 2; i++) {
            const eyeGeometry = new THREE.BoxGeometry(size / 16, size / 8, size / 32)
            const eyeMaterial = new THREE.MeshPhongMaterial({color: 0x373737})
            const eye = new THREE.Mesh(eyeGeometry, eyeMaterial)

            eye.position.set((-size / 8) + ((i*size) / 4), 0, -size / 4.875)

            eye.receiveShadow = true
            eye.castShadow = true

            head.add(eye)
        }

        for (let i = 0; i < 2; i++) {
            const headAntennaGeometry = new THREE.BoxGeometry(size / 2, size / 24, size / 24)
            const headAntennaMaterial = new THREE.MeshPhongMaterial({color: 0x373737})
            const headAntenna = new THREE.Mesh(headAntennaGeometry, headAntennaMaterial)

            headAntenna.position.set((-size / 4) + ((i*size) / 2), 0, 0)

            headAntenna.receiveShadow = true
            headAntenna.castShadow = true

            head.add(headAntenna)
        }

        for (let i = 0; i < 2; i++) {
            const headAntennaTopGeometry = new THREE.BoxGeometry(size / 16, size / 16, size / 16)
            const headAntennaTopMaterial = new THREE.MeshPhongMaterial({color: 0x373737})
            const headAntennaTop = new THREE.Mesh(headAntennaTopGeometry, headAntennaTopMaterial)

            headAntennaTop.position.set((-size / 2) + ((i*size)), size / 32, 0)

            headAntennaTop.receiveShadow = true
            headAntennaTop.castShadow = true

            head.add(headAntennaTop)
        }

        const headTopGeometry = new THREE.SphereGeometry(size / 6, 10)
            const headTopMaterial = new THREE.MeshStandardMaterial({color: color, emissive: 0xe6b91b, roughness: 0.3, metalness: 1, flatShading: true, transparent: true, opacity: 0.75})
            const headTop = new THREE.Mesh(headTopGeometry, headTopMaterial)

            headTop.position.set(0, size / 8, 0)

            headTop.receiveShadow = true
            headTop.castShadow = true

            head.add(headTop)

        //

        head.position.set(0, size * 1.25, size / 8)

        head.rotation.x = - THREE.Math.degToRad(10)
        //head.rotation.y = THREE.Math.degToRad(10)

        worker.add(head)

        //

        worker.position.set(posX, posY, posZ)

        if (direction === 0) {
            worker.rotation.y = THREE.Math.degToRad(0)
        } else if (direction === 1) {
            worker.rotation.y = THREE.Math.degToRad(90)
        } else if (direction === 2) {
            worker.rotation.y = THREE.Math.degToRad(180)
        } else if (direction === 3) {
            worker.rotation.y = THREE.Math.degToRad(270)
        }
    
        scene.add(worker)

        return worker
    },
    Light: (
        color, // Color :: Color of the light
        intensity, // Value :: Intensity of the light (0-1)
        distance, // Value :: "size" of the light
        posX, // Value :: X position of the light source
        posY, // Value :: Y position of the light source
        posZ // Value :: Z position of the light source
    ) => {
        const light = new THREE.PointLight(color, intensity, distance)

        light.position.set(posX, posY, posZ)
        light.castShadow = true
        light.shadow.camera.near = 0.1
        light.shadow.camera.far = 25

        scene.add(light)
    },
    Gameboy: (
        size, // Value :: Length of the gameboy
        state, // Value, State of the gameboy
        color, // Color :: Color of the gameboy
        batteryColor,
        boardColor,
        processorColor,
        screenColor,
        screenButtonColor,
        coverBorderColor,
        posX, // Value :: X position of the gameboy
        posY,
        posZ, // Value :: Z position of the gameboy
    ) => {
        const gameboy = new THREE.Group()

        //

        if(state === 0 || state === 1 || state === 2 || state === 3 || state === 4 || state === 5) {

            const consoleBase = new THREE.Group()

            //

            const baseTopGeometry = new THREE.BoxGeometry(size * 0.32, size / 32, size * 0.46)
            let baseTopMaterial
            if (state === 0) {
                baseTopMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseTopMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseTop = new THREE.Mesh(baseTopGeometry, baseTopMaterial)
        
            baseTop.receiveShadow = true
            baseTop.castShadow = true
            baseTop.position.set(0, 0, 0)

            consoleBase.add(baseTop)

            //

            const baseBottomGeometry = new THREE.BoxGeometry(size * 0.24, size / 32, size * 0.08)
            let baseBottomMaterial
            if (state === 0) {
                baseBottomMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseBottomMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseBottom = new THREE.Mesh(baseBottomGeometry, baseBottomMaterial)
        
            baseBottom.receiveShadow = true
            baseBottom.castShadow = true
            baseBottom.position.set((-size * 0.08) / 2, 0, (size * 0.54) / 2)

            consoleBase.add(baseBottom)

            //

            const baseTriangleGeometry = new THREE.BoxGeometry(size * 0.1125, size / 32, size * 0.1)
            let baseTriangleMaterial
            if (state === 0) {
                baseTriangleMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseTriangleMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseTriangle = new THREE.Mesh(baseTriangleGeometry, baseTriangleMaterial)
        
            baseTriangle.receiveShadow = true
            baseTriangle.castShadow = true
            baseTriangle.position.set((size * 0.085), 0,  (size * 0.235))
            baseTriangle.rotation.y = Math.PI / 4

            consoleBase.add(baseTriangle)

            //

            const baseTopSideGeometry = new THREE.BoxGeometry(size * 0.32, size / 32, size * 0.02)
            let baseTopSideMaterial
            if (state === 0) {
                baseTopSideMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseTopSideMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseTopSide = new THREE.Mesh(baseTopSideGeometry, baseTopSideMaterial)
        
            baseTopSide.receiveShadow = true
            baseTopSide.castShadow = true
            baseTopSide.position.set(0, size / 32, -size * 0.22)

            consoleBase.add(baseTopSide)

            //

            const baseLeftSideGeometry = new THREE.BoxGeometry(size * 0.02, size / 32, size * 0.54)
            let baseLeftSideMaterial
            if (state === 0) {
                baseLeftSideMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseLeftSideMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseLeftSide = new THREE.Mesh(baseLeftSideGeometry, baseLeftSideMaterial)
        
            baseLeftSide.receiveShadow = true
            baseLeftSide.castShadow = true
            baseLeftSide.position.set(-size * 0.15, size / 32, size * 0.04)

            consoleBase.add(baseLeftSide)

            //

            const baseRightSideGeometry = new THREE.BoxGeometry(size * 0.02, size / 32, size * 0.46)
            let baseRightSideMaterial
            if (state === 0) {
                baseRightSideMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseRightSideMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseRightSide = new THREE.Mesh(baseRightSideGeometry, baseRightSideMaterial)
        
            baseRightSide.receiveShadow = true
            baseRightSide.castShadow = true
            baseRightSide.position.set(size * 0.15, size / 32, 0)

            consoleBase.add(baseRightSide)

            //

            const baseBottomSideGeometry = new THREE.BoxGeometry(size * 0.24, size / 32, size * 0.02)
            let baseBottomSideMaterial
            if (state === 0) {
                baseBottomSideMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseBottomSideMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseBottomSide = new THREE.Mesh(baseBottomSideGeometry, baseBottomSideMaterial)
        
            baseBottomSide.receiveShadow = true
            baseBottomSide.castShadow = true
            baseBottomSide.position.set(-size * 0.04, size / 32, size * 0.30)

            consoleBase.add(baseBottomSide)

            //

            const baseTriangleSideGeometry = new THREE.BoxGeometry(size * 0.1125, size / 32, size * 0.02)
            let baseTriangleSideMaterial
            if (state === 0) {
                baseTriangleSideMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseTriangleSideMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseTriangleSide = new THREE.Mesh(baseTriangleSideGeometry, baseTriangleSideMaterial)
        
            baseTriangleSide.receiveShadow = true
            baseTriangleSide.castShadow = true
            baseTriangleSide.position.set(size * 0.1125, size / 32, size * 0.2632)
            baseTriangleSide.rotation.y = Math.PI / 4

            consoleBase.add(baseTriangleSide)

            //

            const baseSeparatorGeometry = new THREE.BoxGeometry(size * 0.32, size / 64, size * 0.02)
            let baseSeparatorMaterial
            if (state === 0) {
                baseSeparatorMaterial = new THREE.MeshStandardMaterial({emissive: 0x424242, roughness: 0.5, metalness: 1})
            } else {
                baseSeparatorMaterial = new THREE.MeshPhongMaterial({ color: color })
            }
            const baseSeparator = new THREE.Mesh(baseSeparatorGeometry, baseSeparatorMaterial)
        
            baseSeparator.receiveShadow = true
            baseSeparator.castShadow = true
            baseSeparator.position.set(0, size / 48, size * 0.16)

            consoleBase.add(baseSeparator)

            //

            gameboy.add(consoleBase)
            
        }

        if(state === 2 || state === 3 || state === 4 || state === 5) {
            const consoleBatteries = new THREE.Group()

            for (let i = 0; i < 2; i++) {
                const batteryGeometry = new THREE.CylinderGeometry( size / 48, size / 48, size / 4.75, 8 )
                const batteryMaterial = new THREE.MeshStandardMaterial({emissive: batteryColor, roughness: 0.5, metalness: 1, flatShading: true})
                const battery = new THREE.Mesh(batteryGeometry, batteryMaterial)

                battery.position.set(0, 0, (i * size) / 20)
                battery.rotation.z = THREE.Math.degToRad(90)
                battery.rotation.x = THREE.Math.degToRad(90)

                battery.receiveShadow = true
                battery.castShadow = true

                consoleBatteries.add(battery)
            }

            consoleBatteries.position.set(-size / 32, size / 36, size / 5)

            gameboy.add(consoleBatteries)
        }

        if(state === 3 || state === 4 || state === 5) {
            const consoleProcessor = new THREE.Group()

            //

            const motherBoardGeometry = new THREE.BoxGeometry( size / 4, size / 64, size / 8)
            const motherBoardMaterial = new THREE.MeshPhongMaterial({color: boardColor})
            const motherBoard = new THREE.Mesh(motherBoardGeometry, motherBoardMaterial)

            motherBoard.position.set(0, size / 64, 0)

            motherBoard.receiveShadow = true
            motherBoard.castShadow = true

            consoleProcessor.add(motherBoard)

            //

            const motherBoardTopGeometry = new THREE.BoxGeometry( size / 8, size / 64, size / 8)
            const motherBoardTopMaterial = new THREE.MeshPhongMaterial({color: boardColor})
            const motherBoardTop = new THREE.Mesh(motherBoardTopGeometry, motherBoardTopMaterial)

            motherBoardTop.position.set(-size / 16, size / 64, -size / 8)

            motherBoardTop.receiveShadow = true
            motherBoardTop.castShadow = true

            consoleProcessor.add(motherBoardTop)

            //
            
            for (let i = 0; i < 4; i++) {
                const processorLinesGeometry = new THREE.BoxGeometry( size / 4.75, size / 64, size / 84)
                const processorLinesMaterial = new THREE.MeshStandardMaterial({emissive: processorColor, roughness: 0.5, metalness: 1})
                const processorLines = new THREE.Mesh(processorLinesGeometry, processorLinesMaterial)

                processorLines.position.set(0, size / 48, size / 20 - (i*size) / 32)

                processorLines.receiveShadow = true
                processorLines.castShadow = true

                consoleProcessor.add(processorLines)
            }

            //

            const processorGeometry = new THREE.BoxGeometry( size / 12, size / 64, size / 12)
            const processorMaterial = new THREE.MeshStandardMaterial({emissive: processorColor, roughness: 0.5, metalness: 1})
            const processor = new THREE.Mesh(processorGeometry, processorMaterial)

            processor.position.set(0, size / 40, size / 20 / 32)

            processor.receiveShadow = true
            processor.castShadow = true

            consoleProcessor.add(processor)

            //

            consoleProcessor.position.set(0, 0, size / 24)

            gameboy.add(consoleProcessor)
        }

        if(state === 4 || state === 5) {
            const consoleScreen = new THREE.Group()

            //

            const screenBoardGeometry = new THREE.BoxGeometry( size / 4.25, size / 64, size / 6)
            const screenBoardMaterial = new THREE.MeshPhongMaterial({color: boardColor})
            const screenBoard = new THREE.Mesh(screenBoardGeometry, screenBoardMaterial)

            screenBoard.position.set(0, size / 48, -size / 9)

            screenBoard.receiveShadow = true
            screenBoard.castShadow = true

            consoleScreen.add(screenBoard)

            //

            const screenGeometry = new THREE.BoxGeometry( size / 8, size / 64, size / 8)
            const screenMaterial = new THREE.MeshStandardMaterial({emissive: screenColor, roughness: 0.1, metalness: 1})
            const screen = new THREE.Mesh(screenGeometry, screenMaterial)

            screen.position.set(0, size / 32, -size / 12)

            screen.receiveShadow = true
            screen.castShadow = true

            consoleScreen.add(screen)

            //

            for (let i = 0; i < 3; i++) {
                const screenButtonGeometry = new THREE.BoxGeometry( size / 48, size / 48, size / 48)
                const screenButtonMaterial = new THREE.MeshStandardMaterial({emissive: screenButtonColor, roughness: 0.3, metalness: 1})
                const screenButton = new THREE.Mesh(screenButtonGeometry, screenButtonMaterial)

                screenButton.position.set(size / 11, size / 48, -size / 8 + (i*size) / 24)

                screenButton.receiveShadow = true
                screenButton.castShadow = true

                consoleScreen.add(screenButton)
            }

            //

            consoleScreen.position.set(0, 0, 0)

            gameboy.add(consoleScreen)
        }

        if(state === 5) {
            const consoleCover = new THREE.Group()

            //

            const coverTopGeometry = new THREE.BoxGeometry(size * 0.32, size / 32, size * 0.24)
            const coverTopMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverTop = new THREE.Mesh(coverTopGeometry, coverTopMaterial)
        
            coverTop.receiveShadow = true
            coverTop.castShadow = true
            coverTop.position.set(0, 0, size * 0.11)

            consoleCover.add(coverTop)

            //

            const coverLeftGeometry = new THREE.BoxGeometry(size * 0.04, size / 32, size * 0.16)
            const coverLeftMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverLeft = new THREE.Mesh(coverLeftGeometry, coverLeftMaterial)
        
            coverLeft.receiveShadow = true
            coverLeft.castShadow = true
            coverLeft.position.set(-size * 0.14, 0, - size * 0.09)

            consoleCover.add(coverLeft)

            //

            const coverRightGeometry = new THREE.BoxGeometry(size * 0.04, size / 32, size * 0.16)
            const coverRightMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverRight = new THREE.Mesh(coverRightGeometry, coverRightMaterial)
        
            coverRight.receiveShadow = true
            coverRight.castShadow = true
            coverRight.position.set(size * 0.14, 0, - size * 0.09)

            consoleCover.add(coverRight)

            //

            const coverSuperTopGeometry = new THREE.BoxGeometry(size * 0.32, size / 32, size * 0.06)
            const coverSuperTopMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverSuperTop = new THREE.Mesh(coverSuperTopGeometry, coverSuperTopMaterial)
        
            coverSuperTop.receiveShadow = true
            coverSuperTop.castShadow = true
            coverSuperTop.position.set(0, 0, -size * 0.20)

            consoleCover.add(coverSuperTop)

            //

            const coverBorderTopGeometry = new THREE.BoxGeometry(size * 0.28, size / 16, size * 0.06)
            const coverBorderTopMaterial = new THREE.MeshPhongMaterial({ color: coverBorderColor })
            const coverBorderTop = new THREE.Mesh(coverBorderTopGeometry, coverBorderTopMaterial)
        
            coverBorderTop.receiveShadow = true
            coverBorderTop.castShadow = true
            coverBorderTop.position.set(0, -size * 0.02, -size * 0.18)

            consoleCover.add(coverBorderTop)

            //

            const coverBorderBottomGeometry = new THREE.BoxGeometry(size * 0.28, size / 16, size * 0.06)
            const coverBorderBottomMaterial = new THREE.MeshPhongMaterial({ color: coverBorderColor })
            const coverBorderBottom = new THREE.Mesh(coverBorderBottomGeometry, coverBorderBottomMaterial)
        
            coverBorderBottom.receiveShadow = true
            coverBorderBottom.castShadow = true
            coverBorderBottom.position.set(0, -size * 0.02, 0)

            consoleCover.add(coverBorderBottom)

            //

            const coverBorderLeftGeometry = new THREE.BoxGeometry(size * 0.08, size / 16, size * 0.16)
            const coverBorderLeftMaterial = new THREE.MeshPhongMaterial({ color: coverBorderColor })
            const coverBorderLeft = new THREE.Mesh(coverBorderLeftGeometry, coverBorderLeftMaterial)
        
            coverBorderLeft.receiveShadow = true
            coverBorderLeft.castShadow = true
            coverBorderLeft.position.set(-size * 0.10, -size * 0.02, -size * 0.10)

            consoleCover.add(coverBorderLeft)
            
            //

            const coverBorderRightGeometry = new THREE.BoxGeometry(size * 0.08, size / 16, size * 0.16)
            const coverBorderRightMaterial = new THREE.MeshPhongMaterial({ color: coverBorderColor })
            const coverBorderRight = new THREE.Mesh(coverBorderRightGeometry, coverBorderRightMaterial)
        
            coverBorderRight.receiveShadow = true
            coverBorderRight.castShadow = true
            coverBorderRight.position.set(size * 0.10, -size * 0.02, -size * 0.10)

            consoleCover.add(coverBorderRight)

            //

            const coverBottomGeometry = new THREE.BoxGeometry(size * 0.24, size / 32, size * 0.08)
            const coverBottomMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverBottom = new THREE.Mesh(coverBottomGeometry, coverBottomMaterial)
        
            coverBottom.receiveShadow = true
            coverBottom.castShadow = true
            coverBottom.position.set((-size * 0.08) / 2, 0, (size * 0.54) / 2)

            consoleCover.add(coverBottom)

            //

            const coverTriangleGeometry = new THREE.BoxGeometry(size * 0.1125, size / 32, size * 0.1)
            const coverTriangleMaterial = new THREE.MeshPhongMaterial({ color: color })
            const coverTriangle = new THREE.Mesh(coverTriangleGeometry, coverTriangleMaterial)
        
            coverTriangle.receiveShadow = true
            coverTriangle.castShadow = true
            coverTriangle.position.set((size * 0.085), 0,  (size * 0.235))
            coverTriangle.rotation.y = Math.PI / 4

            consoleCover.add(coverTriangle)

            //

            const glassGeometry = new THREE.BoxGeometry( size / 8, size / 64, size / 8)
            const glassMaterial = new THREE.MeshStandardMaterial({emissive: boardColor, roughness: 0.1, metalness: 1, transparent: true, opacity: 0.75})
            const glass = new THREE.Mesh(glassGeometry, glassMaterial)

            glass.position.set(0, 0, -size / 12)

            glass.receiveShadow = true
            glass.castShadow = true

            consoleCover.add(glass)

            //

            for (let i = 0; i < 2; i++) {
                const crossControllersGeometry = new THREE.BoxGeometry( size / 24, size / 16, size / 8)
                const crossControllersMaterial = new THREE.MeshStandardMaterial({emissive: screenColor, roughness: 0.1, metalness: 1})
                const crossControllers = new THREE.Mesh(crossControllersGeometry, crossControllersMaterial)

                crossControllers.position.set(-size / 16, 0, size / 10)

                if (i === 1) {
                    crossControllers.rotation.y = THREE.Math.degToRad(90)
                }

                crossControllers.receiveShadow = true
                crossControllers.castShadow = true

                consoleCover.add(crossControllers)
            }

            for (let i = 0; i < 2; i++) {
                const circleControllersGeometry = new THREE.CylinderGeometry( size / 48, size / 48, size / 20, 20)
                const circleControllersMaterial = new THREE.MeshStandardMaterial({emissive: screenButtonColor, roughness: 0.1, metalness: 1})
                const circleControllers = new THREE.Mesh(circleControllersGeometry, circleControllersMaterial)

                circleControllers.position.set(size / 16, 0, size / 8)

                if (i === 1) {
                    circleControllers.position.set(size / 10, 0, size / 12)
                }

                circleControllers.receiveShadow = true
                circleControllers.castShadow = true

                consoleCover.add(circleControllers)
            }

            //

            for (let i = 0; i < 2; i++) {
                const selectControllersGeometry = new THREE.BoxGeometry( size / 10, size / 24, size / 48)
                const selectControllersMaterial = new THREE.MeshPhongMaterial({color: coverBorderColor})
                const selectControllers = new THREE.Mesh(selectControllersGeometry, selectControllersMaterial)

                selectControllers.position.set(size / 32, 0, size / 4)

                if (i === 1) {
                    selectControllers.position.set(size / 16, 0, size / 5)
                }

                selectControllers.receiveShadow = true
                selectControllers.castShadow = true

                consoleCover.add(selectControllers)
            }

            //

            consoleCover.position.set(0, size / 20, 0)

            gameboy.add(consoleCover)
        }

        if(state === 6) {
            const consolePackage = new THREE.Group()

            //

            const packageGeometry = new THREE.BoxGeometry( size / 2, size / 8, size / 1.75)
            const packageMaterial = new THREE.MeshPhongMaterial({color: 0xb98756})
            const package = new THREE.Mesh(packageGeometry, packageMaterial)

            package.position.set(0, 0, -size / 6)

            package.receiveShadow = true
            package.castShadow = true

            consolePackage.add(package)

            //

            const packagePaperGeometry = new THREE.BoxGeometry( size / 4, size / 48, size / 4)
            const packagePaperMaterial = new THREE.MeshPhongMaterial({color: color})
            const packagePaper = new THREE.Mesh(packagePaperGeometry, packagePaperMaterial)

            packagePaper.position.set(-size / 10, size / 16, -size / 4)

            packagePaper.receiveShadow = true
            packagePaper.castShadow = true

            consolePackage.add(packagePaper)

            //

            for (let i = 0; i < 6; i++) {
                const packageMessageGeometry = new THREE.BoxGeometry( size / 6, size / 48, size / 64)
                const packageMessageMaterial = new THREE.MeshPhongMaterial({color: 0x424242})
                const packageMessage = new THREE.Mesh(packageMessageGeometry, packageMessageMaterial)

                packageMessage.position.set(-size / 10, size / 14, (-size / 3) + (i*size) / 32)

                packageMessage.receiveShadow = true
                packageMessage.castShadow = true

                consolePackage.add(packageMessage)
            }

            //

            consolePackage.position.set(-size / 32, size / 36, size / 5)

            gameboy.add(consolePackage)
        }

        gameboy.position.set(posX, posY, posZ)
    
        scene.add(gameboy)

        return gameboy
    },
    FactoryMachine: (
        size, // Value :: Size of the machine
        color, // Color :: Color of the machine
        posX, // Value :: X position of the machine
        posY, // Value :: Y position of the machine
        posZ // Value :: Z position of the machine
    ) => {
        const factoryMachine = new THREE.Group()

        //

        const factoryMachineBaseGeometry = new THREE.BoxGeometry(size * 2, size * 0.8, size * 2)
        const factoryMachineBaseMaterial = new THREE.MeshPhongMaterial({color: color})
        const factoryMachineBase = new THREE.Mesh(factoryMachineBaseGeometry, factoryMachineBaseMaterial)
    
        factoryMachineBase.receiveShadow = true
        factoryMachineBase.castShadow = true
        factoryMachineBase.position.set(0, 0, 0)

        factoryMachine.add(factoryMachineBase)

        //

        const factoryMachineLeftGeometry = new THREE.BoxGeometry(size * 2, size * 0.8, size * 0.375)
        const factoryMachineLeftMaterial = new THREE.MeshPhongMaterial({color: color})
        const factoryMachineLeft = new THREE.Mesh(factoryMachineLeftGeometry, factoryMachineLeftMaterial)
    
        factoryMachineLeft.receiveShadow = true
        factoryMachineLeft.castShadow = true
        factoryMachineLeft.position.set(0, size / 2, size - size * 0.1875)

        factoryMachine.add(factoryMachineLeft)

        //

        const factoryMachineRightGeometry = new THREE.BoxGeometry(size * 2, size * 0.8, size * 0.375)
        const factoryMachineRightMaterial = new THREE.MeshPhongMaterial({color: color})
        const factoryMachineRight = new THREE.Mesh(factoryMachineRightGeometry, factoryMachineRightMaterial)
    
        factoryMachineRight.receiveShadow = true
        factoryMachineRight.castShadow = true
        factoryMachineRight.position.set(0, size / 2, -size + size * 0.1875)

        factoryMachine.add(factoryMachineRight)

        //

        const factoryMachineBackGeometry = new THREE.BoxGeometry(size * 0.25, size * 0.8, size * 1.5)
        const factoryMachineBackMaterial = new THREE.MeshPhongMaterial({color: 0x272727})
        const factoryMachineBack = new THREE.Mesh(factoryMachineBackGeometry, factoryMachineBackMaterial)
    
        factoryMachineBack.receiveShadow = true
        factoryMachineBack.castShadow = true
        factoryMachineBack.position.set(-size * 0.75, size * 0.5, 0)

        factoryMachine.add(factoryMachineBack)

        //

        const factoryMachineVoidGeometry = new THREE.BoxGeometry(size * 0.25, size * 0.8, size * 1.5)
        const factoryMachineVoidMaterial = new THREE.MeshPhongMaterial({color: 0x000000})
        const factoryMachineVoid = new THREE.Mesh(factoryMachineVoidGeometry, factoryMachineVoidMaterial)
    
        factoryMachineVoid.receiveShadow = true
        factoryMachineVoid.castShadow = true
        factoryMachineVoid.position.set(size * 0.25, size * 0.5, 0)

        factoryMachine.add(factoryMachineVoid)

        //

        const factoryMachineDoor = new THREE.Group()

        //

        for (let i = 0; i < 17; i++) {
            const factoryMachinePanelGeometry = new THREE.BoxGeometry(size * 0.025, size * 0.5, size * 0.075)
            const factoryMachinePanelMaterial = new THREE.MeshStandardMaterial({emissive: 0x373737, roughness: 0.3, metalness: 0.6})
            const factoryMachinePanel = new THREE.Mesh(factoryMachinePanelGeometry, factoryMachinePanelMaterial)
        
            factoryMachinePanel.receiveShadow = true
            factoryMachinePanel.castShadow = true
            factoryMachinePanel.position.set(0, 0, -size * 0.625 + (i*size) * 0.08)

            factoryMachinePanel.rotation.z = THREE.Math.degToRad(0)

            factoryMachineDoor.add(factoryMachinePanel)
        }

        //

        factoryMachineDoor.position.set(size * 0.95, size * 0.65, 0)

        factoryMachine.add(factoryMachineDoor)

        //

        const factoryMachineCoverGeometry = new THREE.BoxGeometry(size * 2, size * 0.4, size * 2)
        const factoryMachineCoverMaterial = new THREE.MeshPhongMaterial({color: color})
        const factoryMachineCover = new THREE.Mesh(factoryMachineCoverGeometry, factoryMachineCoverMaterial)
    
        factoryMachineCover.receiveShadow = true
        factoryMachineCover.castShadow = true
        factoryMachineCover.position.set(0, size * 1.1, 0)

        factoryMachine.add(factoryMachineCover)

        //

        factoryMachine.position.set(posX, posY, posZ)
    
        scene.add(factoryMachine)

        return factoryMachine
    },
    Hedge: (
        size,
        color,
        leaves,
        leaves2,
        posX,
        posY,
        posZ,
        rotation
    ) => {
        const hedge = new THREE.Group()

        //

        const hedgeBaseGeometry = new THREE.BoxGeometry(size * 6, size * 0.8, size * 1)
        const hedgeBaseMaterial = new THREE.MeshPhongMaterial({color: color})
        const hedgeBase = new THREE.Mesh(hedgeBaseGeometry, hedgeBaseMaterial)
    
        hedgeBase.receiveShadow = true
        hedgeBase.castShadow = true
        hedgeBase.position.set(0, 0, 0)

        hedge.add(hedgeBase)

        //

        for (let i = 0; i < 2; i++) {
            const hedgeSeparatorBaseGeometry = new THREE.BoxGeometry(size * 0.75, size * 0.8, size * 0.75)
            const hedgeSeparatorBaseMaterial = new THREE.MeshPhongMaterial({color: color})
            const hedgeSeparatorBase = new THREE.Mesh(hedgeSeparatorBaseGeometry, hedgeSeparatorBaseMaterial)
        
            hedgeSeparatorBase.receiveShadow = true
            hedgeSeparatorBase.castShadow = true
            hedgeSeparatorBase.position.set(-size * 2.625 + (i * size * 5.25), size * 0.8, 0)

            hedge.add(hedgeSeparatorBase)
        }

        for (let i = 0; i < 2; i++) {
            const hedgeSeparatorPillarGeometry = new THREE.BoxGeometry(size * 0.4, size * 1.4, size * 0.4)
            const hedgeSeparatorPillarMaterial = new THREE.MeshPhongMaterial({color: color})
            const hedgeSeparatorPillar = new THREE.Mesh(hedgeSeparatorPillarGeometry, hedgeSeparatorPillarMaterial)
        
            hedgeSeparatorPillar.receiveShadow = true
            hedgeSeparatorPillar.castShadow = true
            hedgeSeparatorPillar.position.set(-size * 2.625 + (i * size * 5.25), size * 1.6, 0)

            hedge.add(hedgeSeparatorPillar)
        }

        //

        for (let i = 0; i < 2; i++) {
            const hedgeSeparatorTopGeometry = new THREE.BoxGeometry(size * 0.55, size * 0.45, size * 0.55)
            const hedgeSeparatorTopMaterial = new THREE.MeshPhongMaterial({color: color})
            const hedgeSeparatorTop = new THREE.Mesh(hedgeSeparatorTopGeometry, hedgeSeparatorTopMaterial)
        
            hedgeSeparatorTop.receiveShadow = true
            hedgeSeparatorTop.castShadow = true
            hedgeSeparatorTop.position.set(-size * 2.625 + (i * size * 5.25), size * 2, 0)

            hedge.add(hedgeSeparatorTop)
        }

        //

        const hedgeLeafBaseGeometry = new THREE.BoxGeometry(size * 4.45, size * 3, size * 0.9)
        const hedgeLeafBaseMaterial = new THREE.MeshPhongMaterial({color: leaves2})
        const hedgeLeafBase = new THREE.Mesh(hedgeLeafBaseGeometry, hedgeLeafBaseMaterial)
    
        hedgeLeafBase.receiveShadow = true
        hedgeLeafBase.castShadow = true
        hedgeLeafBase.position.set(0, size * 1.8, 0)

        hedge.add(hedgeLeafBase)

        //

        const hedgeLeafCenterGeometry = new THREE.BoxGeometry(size * 4.5, size * 2.3, size * 1.3)
        const hedgeLeafCenterMaterial = new THREE.MeshPhongMaterial({color: leaves})
        const hedgeLeafCenter = new THREE.Mesh(hedgeLeafCenterGeometry, hedgeLeafCenterMaterial)
    
        hedgeLeafCenter.receiveShadow = true
        hedgeLeafCenter.castShadow = true
        hedgeLeafCenter.position.set(0, size * 1.8, 0)
        hedge.add(hedgeLeafCenter)

        //

        for (let i = 0; i < 2; i++) {
            const hedgeLeafCircleGeometry = new THREE.BoxGeometry(size * 3.5 - (i*size*1.5) , size * 1.5 + (i*size*1.35), size * 1.5)
            const hedgeLeafCircleMaterial = new THREE.MeshPhongMaterial({color: leaves2})
            const hedgeLeafCircle = new THREE.Mesh(hedgeLeafCircleGeometry, hedgeLeafCircleMaterial)

            hedgeLeafCircle.receiveShadow = true
            hedgeLeafCircle.castShadow = true
            hedgeLeafCircle.position.set(0, size * 1.8, 0)

            hedgeLeafCircle.rotation.z = i * THREE.Math.degToRad(90)

            hedge.add(hedgeLeafCircle)
        }

        //

        if (rotation) {
            hedge.rotation.y = THREE.Math.degToRad(90)
        }

        hedge.position.set(posX, posY, posZ)

        scene.add(hedge)
    },
    Sea: (
        size,
        color1,
        color2,
        posX,
        posY,
        posZ,
        quantity
    ) => {
        const sea = new THREE.Group()

        //

        for (let i = 0; i < quantity; i++) {
            for (let j = 0; j < 2; j++) {
                const seaBlockGeometry = new THREE.BoxGeometry(size * 300, size * 2, size * 3)
                let seaBlockMaterial
                if (j === 0) {
                    seaBlockMaterial = new THREE.MeshPhongMaterial({color: color1 })
                } else {
                    seaBlockMaterial = new THREE.MeshPhongMaterial({color: color2 })
                }
                const seaBlock = new THREE.Mesh(seaBlockGeometry, seaBlockMaterial)
            
                seaBlock.receiveShadow = true
                seaBlock.castShadow = true

                seaBlock.position.set(0, 0.5 + (j * size * - 0.5), 0 - (i * size * 6) - (j * size * 3))
                sea.add(seaBlock)
            }
        }

        //

        sea.position.set(posX, posY, posZ)

        scene.add(sea)

        return sea
    },
    Crane: (
        size, // Value :: Size of the crane
        color, // Color :: Color of the crane
        posX, // Value :: X position of the crane
        posY, // Value :: Y position of the crane
        posZ, // Value :: Z position of the crane
    ) => {
        const crane = new THREE.Group()

        //

        const PacketHolder = new THREE.Group()

        //

        const holderPlateGeometry = new THREE.BoxGeometry(size * 1, size * 0.025, size * 1.25)
        const holderPlateMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
        const holderPlate = new THREE.Mesh(holderPlateGeometry, holderPlateMaterial)
    
        holderPlate.receiveShadow = true
        holderPlate.castShadow = true
        holderPlate.position.set(0, 0, 0)

        PacketHolder.add(holderPlate)

        //

        const holderBarGeometry = new THREE.BoxGeometry(size * 0.15, size * 2, size * 0.15)
        const holderBarMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
        const holderBar = new THREE.Mesh(holderBarGeometry, holderBarMaterial)
    
        holderBar.receiveShadow = true
        holderBar.castShadow = true
        holderBar.position.set(size * 1, 0, size * 0.75)

        PacketHolder.add(holderBar)

        //

        const holderBarLightGeometry = new THREE.BoxGeometry(size * 0.25, size * 0.25, size * 0.25)
        const holderBarLightMaterial = new THREE.MeshStandardMaterial({ emissive: 0xff0000, roughness: 0.3, metalness: 1, transparent: true, opacity: 0.5 })
        const holderBarLight = new THREE.Mesh(holderBarLightGeometry, holderBarLightMaterial)
    
        holderBarLight.receiveShadow = true
        holderBarLight.castShadow = true
        holderBarLight.position.set(size * 1, size * 0.85, size * 0.75)

        PacketHolder.add(holderBarLight)

        //

        for (let i = 0; i < 2; i++) {
            const holderPlateLeg = new THREE.Group()

            //

            const holderPlateLegDiagonalGeometry = new THREE.BoxGeometry(size * 0.1, size * 1, size * 0.1)
            const holderPlateLegDiagonalMaterial = new THREE.MeshPhongMaterial({ color: color })
            const holderPlateLegDiagonal = new THREE.Mesh(holderPlateLegDiagonalGeometry, holderPlateLegDiagonalMaterial)
        
            holderPlateLegDiagonal.receiveShadow = true
            holderPlateLegDiagonal.castShadow = true
            holderPlateLegDiagonal.position.set(0, 0, size * - 0.5)
            holderPlateLegDiagonal.rotation.z = THREE.Math.degToRad(45)

            holderPlateLeg.add(holderPlateLegDiagonal)

            //

            const holderPlateLegStraightGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.15, size * 0.1)
            const holderPlateLegStraightMaterial = new THREE.MeshPhongMaterial({ color: color })
            const holderPlateLegStraight = new THREE.Mesh(holderPlateLegStraightGeometry, holderPlateLegStraightMaterial)
        
            holderPlateLegStraight.receiveShadow = true
            holderPlateLegStraight.castShadow = true
            holderPlateLegStraight.position.set(size * - 0.4, size * 0.4, size * - 0.5)

            holderPlateLeg.add(holderPlateLegStraight)

            //

            holderPlateLeg.position.set(size * 0.4, size * -0.5, 0 + (i*size))

            PacketHolder.add(holderPlateLeg)
        }

        //

        crane.add(PacketHolder)

        //

        const craneBody = new THREE.Group()

        //

        const craneBaseGeometry = new THREE.BoxGeometry(size * 0.3, size * 5, size * 0.3)
        const craneBaseMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
        const craneBase = new THREE.Mesh(craneBaseGeometry, craneBaseMaterial)
    
        craneBase.receiveShadow = true
        craneBase.castShadow = true
        craneBase.position.set(0, size * 0.25, 0)

        craneBody.add(craneBase)

        //

        const craneBaseFrameGeometry = new THREE.BoxGeometry(size * 0.35, size * 3.25, size * 0.35)
        const craneBaseFrameMaterial = new THREE.MeshPhongMaterial({ color: palette.emissive, wireframe: true })
        const craneBaseFrame = new THREE.Mesh(craneBaseFrameGeometry, craneBaseFrameMaterial)
    
        craneBaseFrame.receiveShadow = true
        craneBaseFrame.castShadow = true
        craneBaseFrame.position.set(0, size * 0.5, 0)

        craneBody.add(craneBaseFrame)

        //

        const craneHead = new THREE.Group()

        //

        for (let i = 0; i < 3; i++) {
            const cranePivitFrameGeometry = new THREE.CylinderGeometry(size * 0.35, size * 0.35, size * 0.35, 10)
            const cranePivitFrameMaterial = new THREE.MeshPhongMaterial({ color: palette.emissive, wireframe: true })
            const cranePivitFrame = new THREE.Mesh(cranePivitFrameGeometry, cranePivitFrameMaterial)
        
            cranePivitFrame.receiveShadow = true
            cranePivitFrame.castShadow = true
            cranePivitFrame.position.set(0, 0 + (i*size*0.65), 0)

            craneHead.add(cranePivitFrame)
            
        }

        //

        const cranePivitGeometry = new THREE.CylinderGeometry(size * 0.15, size * 0.15, size * 0.15, 10)
        const cranePivitMaterial = new THREE.MeshPhongMaterial({ color: 0x373737, flatShading: true })
        const cranePivit = new THREE.Mesh(cranePivitGeometry, cranePivitMaterial)
    
        cranePivit.receiveShadow = true
        cranePivit.castShadow = true
        cranePivit.position.set(0, size * 2.75, 0)

        craneHead.add(cranePivit)

        //

        const craneHeadBaseGeometry = new THREE.BoxGeometry(size * 0.35, size * 0.35, size * 0.35)
        const craneHeadBaseMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
        const craneHeadBase = new THREE.Mesh(craneHeadBaseGeometry, craneHeadBaseMaterial)
    
        craneHeadBase.receiveShadow = true
        craneHeadBase.castShadow = true
        craneHeadBase.position.set(0, size * 3, 0)

        craneHead.add(craneHeadBase)

        //

        const craneHeadBaseFrameGeometry = new THREE.BoxGeometry(size * 0.4, size * 0.35, size * 0.4)
        const craneHeadBaseFrameMaterial = new THREE.MeshStandardMaterial({ emissive: palette.emissive, roughness: 0.3, metalness: 1, wireframe: true })
        const craneHeadBaseFrame = new THREE.Mesh(craneHeadBaseFrameGeometry, craneHeadBaseFrameMaterial)
    
        craneHeadBaseFrame.receiveShadow = true
        craneHeadBaseFrame.castShadow = true
        craneHeadBaseFrame.position.set(0, size * 3, 0)

        craneHead.add(craneHeadBaseFrame)

        //

        const craneHeadCenterGeometry = new THREE.BoxGeometry(size * 0.15, size * 1, size * 0.15)
        const craneHeadCenterMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
        const craneHeadCenter = new THREE.Mesh(craneHeadCenterGeometry, craneHeadCenterMaterial)
    
        craneHeadCenter.receiveShadow = true
        craneHeadCenter.castShadow = true
        craneHeadCenter.position.set(0, size * 3.55, 0)

        craneHead.add(craneHeadCenter)

        //

        const craneHeadTopGeometry = new THREE.SphereGeometry(size * 0.20, size * 0.20, size * 0.20, 10)
        const craneHeadTopMaterial = new THREE.MeshPhongMaterial({ color: 0x373737, flatShading: true, wireframe: true })
        const craneHeadTop = new THREE.Mesh(craneHeadTopGeometry, craneHeadTopMaterial)
    
        craneHeadTop.receiveShadow = true
        craneHeadTop.castShadow = true
        craneHeadTop.position.set(0, size * 4.05, 0)

        craneHead.add(craneHeadTop)

        //

        for (let i = 0; i < 4; i++) {
            const craneArm = new THREE.Group()

            //

            const craneHand = new THREE.Group()

            //

            for (let i = 0; i < 3; i++) {
                const craneClaws = new THREE.Group()

                //

                const craneClawTopGeometry = new THREE.BoxGeometry(size * 0.05, size * 0.35, size * 0.05)
                const craneClawTopMaterial = new THREE.MeshPhongMaterial({ color: 0x373737 })
                const craneClawTop = new THREE.Mesh(craneClawTopGeometry, craneClawTopMaterial)
            
                craneClawTop.receiveShadow = true
                craneClawTop.castShadow = true
                craneClawTop.position.set(0, -size*0.35/2, 0)

                craneClaws.add(craneClawTop)

                //

                const craneClawBottomGeometry = new THREE.BoxGeometry(size * 0.05, size * 0.35, size * 0.05)
                const craneClawBottomMaterial = new THREE.MeshPhongMaterial({ color: 0x373737 })
                const craneClawBottom = new THREE.Mesh(craneClawBottomGeometry, craneClawBottomMaterial)
            
                craneClawBottom.receiveShadow = true
                craneClawBottom.castShadow = true
                craneClawBottom.position.set(0, -size*0.35, 0)
                craneClawBottom.rotation.z = THREE.Math.degToRad(-20)

                craneClaws.add(craneClawBottom)

                //

                craneClaws.rotation.z = THREE.Math.degToRad(60)
                craneClaws.rotation.y = THREE.Math.degToRad(i*120)

                craneHand.add(craneClaws)
            }

            //

            craneHand.rotation.y = THREE.Math.degToRad(45)

            craneHand.position.set(size*2.5, size * 1, 0)

            craneArm.add(craneHand)

            //

            const craneArmWireGeometry = new THREE.BoxGeometry(size * 0.025, size * 2, size * 0.025)
            const craneArmWireMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
            const craneArmWire = new THREE.Mesh(craneArmWireGeometry, craneArmWireMaterial)
        
            craneArmWire.receiveShadow = true
            craneArmWire.castShadow = true
            craneArmWire.position.set(size * 2.5, size * 2, 0)

            craneArm.add(craneArmWire)

            //

            const craneArmHolderGeometry = new THREE.BoxGeometry(size * 0.025, size * 2.5, size * 0.025)
            const craneArmHolderMaterial = new THREE.MeshPhongMaterial({ color: 0x373737 })
            const craneArmHolder = new THREE.Mesh(craneArmHolderGeometry, craneArmHolderMaterial)
        
            craneArmHolder.receiveShadow = true
            craneArmHolder.castShadow = true
            craneArmHolder.position.set(size * 1.25, size * 3.65, 0)
            craneArmHolder.rotation.z = THREE.Math.degToRad(70)

            craneArm.add(craneArmHolder)

            //

            const craneArmBaseGeometry = new THREE.BoxGeometry(size * 2.5, size * 0.25, size * 0.25)
            const craneArmBaseMaterial = new THREE.MeshStandardMaterial({ emissive: color, roughness: 0.3, metalness: 1 })
            const craneArmBase = new THREE.Mesh(craneArmBaseGeometry, craneArmBaseMaterial)
        
            craneArmBase.receiveShadow = true
            craneArmBase.castShadow = true
            craneArmBase.position.set(size * 1.25, size * 3, 0)

            craneArm.add(craneArmBase)

            //

            const craneArmBaseFrameGeometry = new THREE.BoxGeometry(size * 1.5, size * 0.3, size * 0.3)
            const craneArmBaseFrameMaterial = new THREE.MeshPhongMaterial({ color: palette.emissive, wireframe: true })
            const craneArmBaseFrame = new THREE.Mesh(craneArmBaseFrameGeometry, craneArmBaseFrameMaterial)
        
            craneArmBaseFrame.receiveShadow = true
            craneArmBaseFrame.castShadow = true
            craneArmBaseFrame.position.set(size * 1.25, size * 3, 0)

            craneArm.add(craneArmBaseFrame)

            //

            const craneArmWireHolderGeometry = new THREE.CylinderGeometry(size * 0.15, size * 0.15, size * 0.15, 20)
            const craneArmWireHolderMaterial = new THREE.MeshPhongMaterial({ color: 0x373737 })
            const craneArmWireHolder = new THREE.Mesh(craneArmWireHolderGeometry, craneArmWireHolderMaterial)
        
            craneArmWireHolder.receiveShadow = true
            craneArmWireHolder.castShadow = true
            craneArmWireHolder.position.set(size * 2.5, size * 3.1, 0)
            craneArmWireHolder.rotation.x = THREE.Math.degToRad(90)

            craneArm.add(craneArmWireHolder)

            //

            craneArm.rotation.y = THREE.Math.degToRad(0 + (i * 90))

            craneHead.add(craneArm)
        }

        //

        craneBody.add(craneHead)

        //

        craneBody.position.set(size * 0.2, 0, size * - 2.5)

        crane.add(craneBody)

        //

        crane.position.set(posX, posY, posZ)
    
        scene.add(crane)

        return crane
    },
    Boat(
        size,
        type,
        posX,
        posY,
        posZ,
        length
    ) {
        const boat = new THREE.Group()

        //

        const boatBowGeometry = new THREE.ConeGeometry(size * 2.5, size * 1.5, 2, 1, false, 0, Math.PI )
        const boatBowMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBow = new THREE.Mesh(boatBowGeometry, boatBowMaterial)
    
        boatBow.receiveShadow = true
        boatBow.castShadow = true
        boatBow.position.set(0, - size * 1, 0)
        boatBow.rotation.z = THREE.Math.degToRad(180)

        boat.add(boatBow)

        //

        const boatBowPlatformGeometry = new THREE.CylinderGeometry(size * 2.5, size * 2.5, size * 2.5, 4, 1, false, 0, Math.PI)
        const boatBowPlatformMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBowPlatform = new THREE.Mesh(boatBowPlatformGeometry, boatBowPlatformMaterial)
    
        boatBowPlatform.receiveShadow = true
        boatBowPlatform.castShadow = true
        boatBowPlatform.position.set(0, size* 1, 0)
        boatBowPlatform.rotation.y = THREE.Math.degToRad(180)

        boat.add(boatBowPlatform)

        //

        const boatBowPlatformTriangleGeometry = new THREE.BoxGeometry(size * 1, size * 1, size * 5.125)
        const boatBowPlatformTriangleMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBowPlatformTriangle = new THREE.Mesh(boatBowPlatformTriangleGeometry, boatBowPlatformTriangleMaterial)
    
        boatBowPlatformTriangle.receiveShadow = true
        boatBowPlatformTriangle.castShadow = true
        boatBowPlatformTriangle.position.set(0, size* 1.55, 0)
        boatBowPlatformTriangle.rotation.z = THREE.Math.degToRad(45)

        boat.add(boatBowPlatformTriangle)

        //

        const boatSideGeometry = new THREE.BoxGeometry(size * length, size * 0.05, size * 3)
        const boatSideMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatSide = new THREE.Mesh(boatSideGeometry, boatSideMaterial)
    
        boatSide.receiveShadow = true
        boatSide.castShadow = true
        boatSide.position.set(size * (length/2), size * -1, size * 1.25)
        boatSide.rotation.x = THREE.Math.degToRad(-30)

        boat.add(boatSide)

        //

        const boatSide2Geometry = new THREE.BoxGeometry(size * length, size * 0.05, size * 3)
        const boatSide2Material = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatSide2 = new THREE.Mesh(boatSide2Geometry, boatSide2Material)
    
        boatSide2.receiveShadow = true
        boatSide2.castShadow = true
        boatSide2.position.set(size * (length/2), size * -1, -size * 1.25)
        boatSide2.rotation.x = THREE.Math.degToRad(30)

        boat.add(boatSide2)

        //

        const boatPlatformGeometry = new THREE.BoxGeometry(size * length, size * 1.5, size * 5.125)
        const boatPlatformMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatPlatform = new THREE.Mesh(boatPlatformGeometry, boatPlatformMaterial)
    
        boatPlatform.receiveShadow = true
        boatPlatform.castShadow = true
        boatPlatform.position.set(size * (length/2), size * 0.4, 0)

        boat.add(boatPlatform)

        //

        const boatPlatformMainGeometry = new THREE.BoxGeometry(size * length, size * 0.125, size * 5.125)
        const boatPlatformMainMaterial = new THREE.MeshPhongMaterial({ color: 0xDBC7BE, flatShading: true })
        const boatPlatformMain = new THREE.Mesh(boatPlatformMainGeometry, boatPlatformMainMaterial)
    
        boatPlatformMain.receiveShadow = true
        boatPlatformMain.castShadow = true
        boatPlatformMain.position.set(size * (length/2), size * 1.3, 0)

        boat.add(boatPlatformMain)

        //

        for (let i = 0; i < 3; i++) {
            const boatPlatformWallGeometry = new THREE.BoxGeometry(size * length, size * 1.5, size * 0.125)
            const boatPlatformWallMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
            const boatPlatformWall = new THREE.Mesh(boatPlatformWallGeometry, boatPlatformWallMaterial)
        
            boatPlatformWall.receiveShadow = true
            boatPlatformWall.castShadow = true
            boatPlatformWall.position.set(size * (length/2), size * 1, size * 5.125 / 2 - (size * 5.125 / 2 * i))

            if (i === 1) {
                boatPlatformWall.position.y = size * 0.75
            }

            boat.add(boatPlatformWall)
            
        }

        //

        const boatBackGeometry = new THREE.ConeGeometry(size * 2.5, size * 1.5, 4, 1, false, 0, Math.PI )
        const boatBackMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBack = new THREE.Mesh(boatBackGeometry, boatBackMaterial)
    
        boatBack.receiveShadow = true
        boatBack.castShadow = true
        boatBack.position.set(size*length, -size * 1, 0)
        boatBack.rotation.z = THREE.Math.degToRad(180)
        boatBack.rotation.y = THREE.Math.degToRad(180)

        boat.add(boatBack)

        //

        const boatBackPlatformGeometry = new THREE.CylinderGeometry(size * 2.5, size * 2.5, size * 2.5, 8, 1, false, 0, Math.PI)
        const boatBackPlatformMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBackPlatform = new THREE.Mesh(boatBackPlatformGeometry, boatBackPlatformMaterial)
    
        boatBackPlatform.receiveShadow = true
        boatBackPlatform.castShadow = true
        boatBackPlatform.position.set(size * length, size* 1, 0)

        boat.add(boatBackPlatform)

        //

        const boatBackPlatformBoxGeometry = new THREE.BoxGeometry(size * 0.15, size * 1, size * 5.125)
        const boatBackPlatformBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x41337A, flatShading: true })
        const boatBackPlatformBox = new THREE.Mesh(boatBackPlatformBoxGeometry, boatBackPlatformBoxMaterial)
    
        boatBackPlatformBox.receiveShadow = true
        boatBackPlatformBox.castShadow = true
        boatBackPlatformBox.position.set(length*size, size* 1.75, 0)

        boat.add(boatBackPlatformBox)

        //

        const boatCockpitBaseGeometry = new THREE.BoxGeometry(size * 2, size * 4, size * 3)
        const boatCockpitBaseMaterial = new THREE.MeshPhongMaterial({ color: 0xCBB3BF, flatShading: true })
        const boatCockpitBase = new THREE.Mesh(boatCockpitBaseGeometry, boatCockpitBaseMaterial)
    
        boatCockpitBase.receiveShadow = true
        boatCockpitBase.castShadow = true
        boatCockpitBase.position.set(length*size, size* 1.75, 0)

        boat.add(boatCockpitBase)

        //

        const boatCockpitGeometry = new THREE.BoxGeometry(size * 1.75, size * 1, size * 5)
        const boatCockpitMaterial = new THREE.MeshPhongMaterial({ color: 0xCBB3BF, flatShading: true })
        const boatCockpit = new THREE.Mesh(boatCockpitGeometry, boatCockpitMaterial)
    
        boatCockpit.receiveShadow = true
        boatCockpit.castShadow = true
        boatCockpit.position.set(length*size - (size*0.5), size* 3.75, 0)

        boat.add(boatCockpit)

        //

        const boatCockpitWindowGeometry = new THREE.BoxGeometry(size * 1.75, size * 0.15, size * 4.5)
        const boatCockpitWindowMaterial = new THREE.MeshPhongMaterial({ color: 0x373737, flatShading: true })
        const boatCockpitWindow = new THREE.Mesh(boatCockpitWindowGeometry, boatCockpitWindowMaterial)
    
        boatCockpitWindow.receiveShadow = true
        boatCockpitWindow.castShadow = true
        boatCockpitWindow.position.set(length*size - (size*0.6), size* 3.75, 0)

        boat.add(boatCockpitWindow)

        //

        boat.position.set(posX - size*(length/2), posY, posZ)

        scene.add(boat)

        //

        return boat
    },
    Container: (size, containers, color) => {
        if (containers % 2 === 0) {
            const containerGeometry = new THREE.BoxGeometry(size * 1, size * 1, size * 2)
            const containerMaterial = new THREE.MeshPhongMaterial({ color: color })
            const container = new THREE.Mesh(containerGeometry, containerMaterial)
        
            container.receiveShadow = true
            container.castShadow = true
            container.position.set(size * 1.5 + (size * containers / 1.5), size * 2, size * 1.25)

            scene.add(container)

            return container
        } else {
            const containerGeometry = new THREE.BoxGeometry(size * 1, size * 1, size * 2)
            const containerMaterial = new THREE.MeshPhongMaterial({ color: color })
            const container = new THREE.Mesh(containerGeometry, containerMaterial)
        
            container.receiveShadow = true
            container.castShadow = true
            container.position.set(size * 1.5 + (size * (containers - 1) / 1.5), size * 2, -size * 1.25)

            scene.add(container)

            return container
        }
    }
}