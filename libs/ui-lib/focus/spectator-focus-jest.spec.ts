import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

@Component({
  selector: 'ui-test-focus',
  template: `<button id="button1" (focus)="countFocus('button1')" (blur)="countBlur('button1')">Button1</button>
             <button id="button2" (focus)="countFocus('button2')" (blur)="countBlur('button2')">Button2</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.tabindex]': '0',
    '(focus)': 'countFocus("ui-test-focus")',
    '(blur)': 'countBlur("ui-test-focus")'
  }
})
export class TestFocusComponent {

  private readonly focusCounts = new Map<string, number>();
  private readonly blurCounts = new Map<string, number>();

  public countFocus(id: string) {
    this.focusCounts.set(id, this.focusCount(id) + 1);
  }

  public countBlur(id: string) {
    this.blurCounts.set(id, this.blurCount(id) + 1);
  }

  public focusCount(id: string): number {
    return this.focusCounts.get(id) ?? 0;
  }

  public blurCount(id: string): number {
    return this.blurCounts.get(id) ?? 0;
  }

}

describe('Spectator focus() in jest', () => {

  const createHost = createHostFactory(TestFocusComponent);
  let host: SpectatorHost<TestFocusComponent>;

  beforeEach(() => {
    host = createHost('<ui-test-focus></ui-test-focus>');
  })

  it('SpectatorHost.focus() in jest does not track active element', () => {
    host.focus('#button1');

    // FAILS
    expect(host.query('#button1')).toBeFocused();
  });

  it('HTMLElement.focus() in jest tracks the active element', () => {
    (host.query('#button1') as HTMLElement).focus();

    // passes
    expect(host.query('#button1')).toBeFocused();
  });

  it('SpectatorHost.focus() in jest does not cause blur events', () => {
    host.focus();
    host.focus('#button1');
    host.focus('#button2');

    // FAILS: blur counts are not present
    expect(host.component.focusCount('ui-test-focus')).toBe(1);
    expect(host.component.blurCount('ui-test-focus')).toBe(1);
    expect(host.component.focusCount('button1')).toBe(1);
    expect(host.component.blurCount('button1')).toBe(1);
    expect(host.component.focusCount('button2')).toBe(1);
    expect(host.component.blurCount('button2')).toBe(0);
  });


  it('HTMLElement.focus() in jest does cause blur events', () => {
    host.element.focus();
    (host.query('#button1') as HTMLElement).focus();
    (host.query('#button2') as HTMLElement).focus();

    // passes
    expect(host.component.focusCount('ui-test-focus')).toBe(1);
    expect(host.component.blurCount('ui-test-focus')).toBe(1);
    expect(host.component.focusCount('button1')).toBe(1);
    expect(host.component.blurCount('button1')).toBe(1);
    expect(host.component.focusCount('button2')).toBe(1);
    expect(host.component.blurCount('button2')).toBe(0);
  });

});
