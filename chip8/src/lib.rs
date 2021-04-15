extern crate chip8;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::wasm_bindgen;

use chip8::{cpu::Status, CPU, MMU};

mod utils;

#[wasm_bindgen]
pub fn initialize() {
    utils::set_panic_hook()
}

#[wasm_bindgen]
pub struct CHIP8(CPU);

#[wasm_bindgen]
impl CHIP8 {
    pub fn new(rom: Vec<u8>) -> Self {
        let mut mmu: MMU = Default::default();

        for (i, &byte) in rom.iter().enumerate() {
            mmu.upper_rom[i] = byte;
        }

        mmu.lock_rom();

        let cpu = CPU::new(mmu);

        Self(cpu)
    }

    pub fn rb(&self, offset: usize) -> u8 {
        self.0.bus.borrow().rb(offset)
    }

    pub fn dump_heap(&self) -> Vec<u8> {
        let bus = self.0.bus.borrow();
        bus.rom
            .iter()
            .chain(bus.upper_rom.iter())
            .map(|&a| a)
            .collect()
    }

    pub fn get_vram(&self, offset: usize) -> u8 {
        self.0.bus.borrow().vram[offset]
    }

    pub fn set_keypad(&mut self, mask: u16) {
        self.0.keypad = mask
    }

    pub fn status(&self) -> i8 {
        match self.0.status() {
            Status::Running => -1,
            Status::Halt => -2,
            Status::WaitingKeypress(x) => x as i8,
        }
    }
    pub fn set_running(&mut self) {
        self.0.status = Status::Running
    }

    pub fn run_cycle(&mut self) {
        self.0.cycle();
    }

    pub fn pc(&self) -> u16 {
        self.0.pc
    }
    pub fn sp(&self) -> u16 {
        self.0.sp
    }

    pub fn register(&self, x: usize) -> u8 {
        self.0.v[x]
    }
    pub fn set_register(&mut self, x: usize, value: u8) {
        self.0.v[x] = value
    }
    pub fn i(&self) -> u16 {
        self.0.i
    }

    pub fn delay(&self) -> u8 {
        self.0.delay
    }
    pub fn sound(&self) -> u8 {
        self.0.sound
    }

    pub fn stack(&self) -> Vec<u16> {
        self.0.stack.to_vec()
    }

    pub fn decrement_timers(&mut self) {
        self.0.delay = self.0.delay.saturating_sub(1);
        self.0.sound = self.0.sound.saturating_sub(1);
    }
}
