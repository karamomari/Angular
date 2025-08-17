import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements AfterViewInit {
 ngAfterViewInit(): void {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      dx: (Math.random()-0.5) * 1.5,
      dy: (Math.random()-0.5) * 1.5
    }));

    function animate() {
      ctx!.clearRect(0,0,canvas.width,canvas.height);
      for (let p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx!.fillStyle = "rgba(255,255,255,0.6)";
        ctx!.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x<0 || p.x>canvas.width) p.dx*=-1;
        if (p.y<0 || p.y>canvas.height) p.dy*=-1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
}
