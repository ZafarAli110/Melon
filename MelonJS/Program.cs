﻿using Cli.NET.Tools;
using MelonJs.JavaScript.Containers;
using MelonJs.Static.Jint;
using MelonJS;
using MelonJS.Commands;

JintStatic.CurrentJintEngine = new();

var container = new CommandContainer(indicator: "> ", indicatorColor: ConsoleColor.Green);
var engineContainer = new JintContainer(JintStatic.CurrentJintEngine);

CLNConsole.WriteLine(StaticData.ApplicationData(), ConsoleColor.Yellow);
Console.WriteLine();

container.Register(new()
{
    { "run", new ExecuteCommand(engineContainer) }
});

container.WaitForNextCommand(); 