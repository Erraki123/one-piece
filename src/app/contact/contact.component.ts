import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  playerHealth = 100;
  score = 0;
  gameOver = false;
  victory = false;
  playerPosition = { x: 50, y: 250 };
  moveSpeed = 10;
  enemySpeed = 5;

  playerImage = 'assets/luffy.png'; // إضافة صورة اللاعب

  enemies = [
    { health: 100, position: { x: 800, y: 50 }, damage: 10, image: 'assets/kaido.png' },
    { health: 100, position: { x: 50, y: 600 }, damage: 15, image: 'assets/ulo.jpg' },
    { health: 100, position: { x: 700, y: 400 }, damage: 20, image: 'assets/imu.jpg' },
    { health: 100, position: { x: 300, y: 700 }, damage: 25, image: 'assets/akaino.jpg' },
  ];

  ngOnInit(): void {
    setInterval(() => {
      if (this.gameOver || this.victory) return;
      this.moveEnemiesTowardPlayer();
      this.attackPlayer();
      this.checkVictory(); // تحقق من الفوز
    }, 500);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.gameOver || this.victory) return;

    switch (event.key) {
      case 'ArrowUp':
        this.playerPosition.y = Math.max(0, this.playerPosition.y - this.moveSpeed);
        break;
      case 'ArrowDown':
        this.playerPosition.y = Math.min(800, this.playerPosition.y + this.moveSpeed);
        break;
      case 'ArrowLeft':
        this.playerPosition.x = Math.max(0, this.playerPosition.x - this.moveSpeed);
        break;
      case 'ArrowRight':
        this.playerPosition.x = Math.min(1000, this.playerPosition.x + this.moveSpeed);
        break;
      case ' ':
        this.attackEnemies();
        break;
    }
  }

  moveEnemiesTowardPlayer(): void {
    this.enemies.forEach((enemy) => {
      if (enemy.health <= 0) return;

      const dx = this.playerPosition.x - enemy.position.x;
      const dy = this.playerPosition.y - enemy.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        enemy.position.x += (dx / distance) * this.enemySpeed;
        enemy.position.y += (dy / distance) * this.enemySpeed;
      }
    });
  }

  attackPlayer(): void {
    this.enemies.forEach((enemy) => {
      const distance = this.calculateDistance(this.playerPosition, enemy.position);

      if (distance < 50) {
        this.playerHealth -= enemy.damage;
        if (this.playerHealth <= 0) {
          this.playerHealth = 0;
          this.gameOver = true;
        }
      }
    });
  }

  attackEnemies(): void {
    this.enemies.forEach((enemy) => {
      const distance = this.calculateDistance(this.playerPosition, enemy.position);

      if (distance < 100) {
        enemy.health -= 20;
        if (enemy.health <= 0) {
          enemy.health = 0;
          this.score += 10;
        }
      }
    });
  }

  checkVictory(): void {
    if (this.enemies.every((enemy) => enemy.health <= 0)) {
      this.victory = true;
    }
  }

  calculateDistance(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  }

  resetGame(): void {
    this.playerHealth = 100;
    this.score = 0;
    this.gameOver = false;
    this.victory = false;
    this.playerPosition = { x: 50, y: 250 };

    this.enemies = [
      { health: 100, position: { x: 800, y: 50 }, damage: 10, image: 'assets/enemy1.jpg' },
      { health: 100, position: { x: 50, y: 600 }, damage: 15, image: 'assets/enemy2.jpg' },
      { health: 100, position: { x: 700, y: 400 }, damage: 20, image: 'assets/enemy3.jpg' },
      { health: 100, position: { x: 300, y: 700 }, damage: 25, image: 'assets/enemy4.jpg' },
    ];
  }
}
